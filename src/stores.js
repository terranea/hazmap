import { writable, readable, derived } from "svelte/store";
import { db, storage } from "./firebase";
import { collectionData } from "rxfire/firestore";
import { startWith } from "rxjs/operators";

export const user = writable(null);

export const filter = writable({types: []});

const createWritableStore = (key, startValue) => {
  const { subscribe, set } = writable(startValue);
  
	return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }
      
      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

const query = db
  .collection("events")
  .where("Countries", "==", "Germany")
  .orderBy("StartTime", "desc")
  .limit(17);

export const events = readable([], function start(set) {
  const eventObs = collectionData(query, "uid").pipe(startWith([]));
  const ref = eventObs.subscribe(value => {
    set(value);
  });

  return function stop() {
    ref.unsubscribe();
  };
});

export const filteredEvents = derived([events, filter], ([$events, $filter], set) => {
  let data = $events.filter(event => {
    return !$filter.types.includes(event.PrimaryType.toLowerCase());
  })
  set(data)
})

function createEventSelection() {
  const { subscribe, set } = writable(null);

  return {
    subscribe,
    setItem: payload => set(payload),
    reset: () => set(null)
  };
}
export const eventSelection = createEventSelection();

export const selectedEvent = derived(
  [events, eventSelection],
  ([$events, $eventSelection], set) => {
    !$eventSelection
      ? set(null)
      : set(
          $events.find(e => {
            return e.uid === $eventSelection.uid;
          })
        );
  }
);

export const eventNotes = derived(eventSelection, ($eventSelection, set) => {
  let ref = null;
  if ($eventSelection) {
    const query = db
      .collection("notes")
      .where("Event", "==", $eventSelection.uid);
    const notes = collectionData(query, "id").pipe(startWith([]));
    ref = notes.subscribe(value => {
      set(value);
    });
  }
  return () => {
    set(null);
    if (ref) ref.unsubscribe();
  };
});

export const eventData = derived(selectedEvent, ($selectedEvent, set) => {
  if ($selectedEvent) {
    let file = "eventdata/" + $selectedEvent.Origin.EventCode + ".geojson";
    let ref = storage.ref().child(file);
    ref
      .getDownloadURL()
      .then(function(url) {
        set(url);
      })
      .catch(function(error) {
        console.log("Error getting eventdata: ", error);
        set(null);
      });
  }
  return () => {
    set(null);
  };
});

// export const eventData = derived(eventSelection, ($eventSelection, set) => {
//   if ($eventSelection) {
//     db.collection("eventdata").where("event", "==", $eventSelection.uid)
//       .get()
//       .then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//           set(doc.data().URL)
//         });
//       })
//       .catch(function (error) {
//         console.log("Error getting documents: ", error);
//         set(null)
//       });
//   }
//   return () => {
//     set(null)
//   }
// })

export const alert = writable(null);

export const showAbout = writable({ show: false, title: "About" });
