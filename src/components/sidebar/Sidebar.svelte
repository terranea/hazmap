<script>
import { events, eventSelection, selectedEvent, eventPics } from '../../stores'
import List from './List.svelte'
import Single from './Single.svelte'
import {user} from '../../stores'
import Upload from '../Upload.svelte'

let resize = false
let upload = false
let select = "se"

function openPictureUpload() {
  if($user) {
    upload = true
    console.log("LOGEIN")
  } else {
    console.log("PLEASE LOGIN")
  }
}

</script>

<style>
aside {
  position: relative;
  order: 1;
  height: 25vh;
  box-sizing: border-box;
  transition: 0.5s;
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
}

.resize {
  height: 56vh;
}

.btn-resize {
  position: absolute;
  right: 0;
  top: 0;
}

.btn-upload {
  position: absolute;
  top: -60px;
  left: calc(50% - 22px);
  z-index: 5;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  font-size: 1.6rem;
  background:cornflowerblue;
  padding: 0;
  fill: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-upload:hover {
  background: #0053ba;
  outline: none;
}

  .btn-upload svg {
    width: 30px;
    height: 30px;
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

  .btn-upload {
    top: 0;
    right: 0;
    left: inherit;
    height: 36px;
    width: 36px;
  }

  .btn-upload svg {
    width: 25px;
    height: 25px;
  }
}
</style>

<aside class:resize>

<button class="round btn-upload" on:click="{openPictureUpload}">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,9c-1.626,0-3,1.374-3,3s1.374,3,3,3s3-1.374,3-3S13.626,9,12,9z"/><path d="M20,5h-2.586l-2.707-2.707C14.52,2.105,14.266,2,14,2h-4C9.734,2,9.48,2.105,9.293,2.293L6.586,5H4C2.897,5,2,5.897,2,7v11 c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2V7C22,5.897,21.103,5,20,5z M12,17c-2.71,0-5-2.29-5-5c0-2.71,2.29-5,5-5s5,2.29,5,5 C17,14.71,14.71,17,12,17z"/></svg>
</button>

{#if upload}
<Upload on:close={() => upload = false} />
{/if}

<button class="round btn-resize" on:click="{() => resize = !resize}">
  {#if resize}
  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z"/></svg>
  {:else}
  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M6.293 13.293L7.707 14.707 12 10.414 16.293 14.707 17.707 13.293 12 7.586z"/></svg>
  {/if}
</button>

<List events={$events} show={$selectedEvent ? true : false} on:select={(ev) => eventSelection.setItem(ev.detail)}/>
<!-- <List events={$events} show={$selectedEvent ? true : false} on:select={(ev) => select = ev.detail.Title}/> -->
{#if $selectedEvent}
<Single event={$selectedEvent} eventPics={eventPics} on:reset={() => eventSelection.reset()}/>
{/if}

</aside>