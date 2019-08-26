import { writable, readable, derived } from 'svelte/store';
import { db } from "./firebase";
import { collectionData } from 'rxfire/firestore';
import { startWith } from 'rxjs/operators';
export const count = writable(0);

const query = db.collection('events').where("Countries", "==", "Germany").orderBy("StartTime", "desc").limit(17)

export const events = readable([], function start(set) {
  const eventObs = collectionData(query, 'uid').pipe(startWith([]));
  const ref = eventObs.subscribe(value => {
    set(value)
  });

  return function stop() {
    console.log("unsub events")
    ref.unsubscribe()
  };
});

function createEventSelection() {
  const { subscribe, set } = writable(null)

  return {
    subscribe,
    setItem: (payload) => set(payload),
    reset: () => set(null)
  }
}
export const eventSelection = createEventSelection()

export const selectedEvent = derived([events, eventSelection], ([$events, $eventSelection], set) => {
  !$eventSelection ? set(null) : set($events.find(e => {
    return e.uid === $eventSelection.uid
  }))
}
);

export const eventPics = derived(eventSelection, ($eventSelection, set) => {
  let ref = null
  if ($eventSelection) {
    const query = db.collection("pictures").where("Event", "==", $eventSelection.uid);
    const pics = collectionData(query, "id").pipe(startWith([]));
    ref = pics.subscribe(value => {
      set(value)
    });
  }
  return () => {
    set(null)
    if (ref) ref.unsubscribe()
  }
})


