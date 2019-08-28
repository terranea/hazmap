<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<style>
	.modal-background {
    position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 5;
	}

	.modal {
		position: fixed;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 25em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 1em;
		border-radius: 0.2em;
    background: white;
    z-index: 6;
	}

  .btns {
    display: flex;
    justify-content: space-between;
  }

  hr {
    border-style: solid;
    border-color: #29bb5a;
  }

	button {
		display: block;
	}
</style>

<div class='modal-background' on:click='{() => dispatch("close")}'></div>

<div class='modal'>
	<slot name='header'></slot>
	<hr>
	<slot></slot>
	<hr>

  <div class="btns">
	<button on:click='{() => dispatch("close")}'>close</button>
  <slot name="button"></slot>
  </div>
</div>
