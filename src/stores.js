import { writable, readable, derived } from 'svelte/store';
import { db } from "./firebase";
import { collectionData } from 'rxfire/firestore';
import { startWith } from 'rxjs/operators';
export const count = writable(0);

const query = db.collection('events').where("Countries", "==", "Germany").orderBy("StartTime", "desc").limit(17)

export const events = readable([], function start(set) {
  const eventObs = collectionData(query, 'uid').pipe(startWith([]));
  const unsubscribe = eventObs.subscribe(value => {
    set(value)
  });

  return function stop() {
    unsubscribe()
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


