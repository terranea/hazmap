<script>
  import Modal from "./Modal.svelte";
  import { events } from '../stores'
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();
  
  let showModal
  let value = "hey"

  onMount(() => {
    console.log("MOUNT")

    return () => {
      console.log("UNMOUNT")
    }
  })
</script>

<style>
select {
 width: 100%;
}
</style>

<Modal on:close={() => dispatch('close')}>
  <h2 slot="header">Upload</h2>
  <select name="events">
    {#each $events as event}
     <option value="{event.uid}">{event.Title}</option>
    {/each}
  </select>
  <input type="text" bind:value>
</Modal>