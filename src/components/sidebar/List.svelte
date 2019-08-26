<script>
import { createEventDispatcher } from 'svelte';
import { timestampToDateString, hazardTypeColor } from '../../helper'
const dispatch = createEventDispatcher();
export let events;
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
  padding-bottom: .2em;
}

span {
  color: #696969;
  font-size: .8em;
}

h1 {
  padding-top: .2em;
}

h3 {
  padding: 0;
    white-space: nowrap; 
  overflow:hidden;
  text-overflow:ellipsis;
}

.content {
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0 10px;
  flex: 1;
  scrollbar-color: #c0c0c085 #f1f1f1;
  scrollbar-width: thin;
}

.scroll2::-webkit-scrollbar {
  width: 5px;
}
 
.scroll2::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: #c0c0c085; 
}

.event {
  margin-bottom: 5px;
  border-radius: 6px;
  background: #fff;
  padding: 13px 15px;
  cursor: pointer;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.event:hover {
  background: #d6d6d6;
}

</style>

<div class="list">
  <header>
    <h1>Recent Events</h1>
  </header>
  <div class="content scroll2">
  {#each events as event}
    <div class="event" on:click="{() => dispatch('select', event)}">
      <h3 title={event.Title}>{event.Title}</h3>
      <div class="col">
        <span>{event.Countries}</span>
        <span>{event.Origin.EventCode}</span>
      </div>
      <div class="col">
        <span style="color: {hazardTypeColor(event.PrimaryType)}">{event.PrimaryType}</span>
        <span>{timestampToDateString(event.StartTime)}</span>
      </div>
    </div>
    	{/each}
  </div>
</div>