<script>
import { events, eventSelection, selectedEvent, eventPics } from '../../stores'
import List from './List.svelte'
import Single from './Single.svelte'

let resize = false
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

@media (min-width: 980px) {
  aside {
    width: 340px;
    order: 0;
    height: 100%;
    box-shadow: none;
    padding-right: .1em;
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

{#if $selectedEvent}
<Single event={$selectedEvent} eventPics={eventPics} on:reset={() => eventSelection.reset()}/>
{:else}
<List events={$events} on:select={(ev) => eventSelection.setItem(ev.detail)}/>
{/if}

</aside>