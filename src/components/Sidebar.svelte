<script>
let resize = false
export let events;
</script>

<style>
aside {
  position: relative;
  order: 1;
  height: 20vh;
  transition: 0.5s;
  padding: .5em;
  background: #f1f1f1;
}

.resize {
  height: 56vh;
}

.btn-resize {
  position: absolute;
  right: 0;
  top: 0;
}

.list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.list .col {
  display: flex;
  justify-content: space-between;
}

.list header {
  height: 40px;
  padding-left: 10px;
  padding-top: 10px;
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

@media (min-width: 980px) {
  aside {
    width: 340px;
    order: 0;
    height: 100%;
    box-shadow: none;
  }

  .btn-resize {
    display: none;
  }
}
</style>

<aside class:resize>
<button class="round btn-resize" on:click="{() => resize = !resize}">
  {#if resize}
  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z"/></svg>
  {:else}
  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M6.293 13.293L7.707 14.707 12 10.414 16.293 14.707 17.707 13.293 12 7.586z"/></svg>
  {/if}
</button>

<div class="list">
  <header>
    <h2>Recent Events</h2>
  </header>
  <div class="content scroll2">
  {#each $events as event}
    <div class="event" >
      <h3>{event.Title}</h3>
      <div class="col">
        <span>{event.Countries}</span>
        <span>{event.Origin.EventCode}</span>
      </div>
      <div class="col">
        <!-- <span :style="{color: color(event.PrimaryType)}">{{event.PrimaryType}}</span> -->
        <!-- <span>{{timestampToDateString(event.StartTime)}}</span> -->
      </div>
    </div>
    	{/each}
  </div>
</div>

</aside>