<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 12;
  }

  .modal {
    position: fixed;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 40em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background: white;
    z-index: 13;
    display: flex;
    flex-direction: column;
  }

  .btns {
    display: flex;
    justify-content: space-between;
  }

  hr {
    border-style: solid;
    border-color: #29bb5a;
    width: 100%;
  }
</style>

<div class="modal-background" on:click={() => dispatch('close')} />

<div class="modal">
  <slot name="header" />
  <hr />
  <slot />
  <hr />

  <div class="btns">
    <slot name="buttons" />
    <button class="btn-simple" on:click={() => dispatch('close')}>close</button>
  </div>
</div>
