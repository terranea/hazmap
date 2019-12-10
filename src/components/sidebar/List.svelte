<script>
import { createEventDispatcher } from 'svelte';
import { timestampToDateString, hazardTypeColor } from '../../helper'
const dispatch = createEventDispatcher();
export let events;
export let show;

    const images = [
      { imageUrl: "icons/fire-sm.png", id: "fire" },
      { imageUrl: "icons/flood-sm.png", id: "flood" },
      { imageUrl: "icons/massm-sm.png", id: "massm" },
      { imageUrl: "icons/storm-sm.png", id: "storm" },
      { imageUrl: "icons/picture.png", id: "pic" }
    ];

function getImage(key) {
  console.log(key)
  switch (key) {
    case "Wildfire" || "Fire" || "Forestfire":
      return "icons/fire-sm.png"
    case "Flood":
      return "icons/flood-sm.png"
    case "Mass movement":
      return "icons/massm-sm.png"
    case "Storm":
      return "icons/storm-sm.png"
    default:
      return "icons/fire-sm.png"
  }
}
</script>

<style>
.list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.col {
  display: flex;
  justify-content: space-between;
}

header {
  height: 40px;
  text-align: center;
  padding: .4em 0;
}

span {
  color: #696969;
  font-size: .8em;
}

span img {
  margin-right: 3px;
  margin-bottom: -3px;
}

h1 {
  padding-top: .2em;
}

h3 {
  padding: 0;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}

.content {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  scrollbar-color: #c0c0c085 #f1f1f1;
  scrollbar-width: thin;
  display: flex;
  flex-direction: column;
  padding-bottom: 1em;
}

.scroll::-webkit-scrollbar {
  width: 5px;
}
 
.scroll::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: #c0c0c085; 
}

.event {
  margin: .2em .4em;
  border-radius: 6px;
  background: #fff;
  padding: 13px 15px;
  cursor: pointer;
  height: 70px;
  min-height: 78px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.event:hover {
  background: #d6d6d6;
}

.unshow {
  display: none;
}

</style>

<div class="list" class:unshow={show}>
  <header>
    <h1>Recent Events</h1>
  </header>
  <div class="content scroll">
  {#each events as event}
    <div class="event" on:click="{() => dispatch('select', event)}">
      <h3 title={event.Title}>{event.Title}</h3>
      <div class="col">
        <span>{event.Countries}</span>
        <span>{event.Origin.EventCode}</span>
      </div>
      <div class="col">
        <span style="color: {hazardTypeColor(event.PrimaryType)}"><img height="18px" src="{getImage(event.PrimaryType)}" alt="type symbol">{event.PrimaryType}</span>
        <span>{timestampToDateString(event.StartTime)}</span>
      </div>
    </div>
    	{/each}
  </div>
</div>