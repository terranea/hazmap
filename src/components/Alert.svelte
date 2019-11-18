<script>
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let message;

  onMount(() => {
    setTimeout(() => dispatch("close"), 3000);
  });
</script>

<style>
  .alert {
    position: absolute;
    left: 50%;
    top: 50px;
    min-height: 30px;
    margin-top: 3px;
    z-index: 1000;
  }

  .content {
    width: 100%;
    position: relative;
    left: -50%;
    border-color: #fc8181 !important;
    background-color: #fff5f5 !important;
    border-radius: 0.25rem !important;
    border: 0 solid #e2e8f0;
    box-sizing: inherit;
    padding: 0.75rem !important;
    padding-top: 1rem !important;
    color: #c53030 !important;
  }

  .icon {
    position: absolute;
    right: 0;
    top: 0;
  }

  svg {
    height: 1.5em;
    width: 1.5em;
    fill: #c53030;
  }
  
</style>

<div transition:fade class="alert" role="alert">
  <div class="content">
    <!-- <strong>Alert</strong> -->
    <span>{message}</span>
    <span class="icon">
      <svg
        role="button"
        on:click={() => dispatch('close')}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <title>Close</title>
        <path
          d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2
          0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10
          8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758
          3.15a1.2 1.2 0 0 1 0 1.698z" />
      </svg>
    </span>
  </div>
</div>
