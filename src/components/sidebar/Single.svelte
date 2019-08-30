<script>
  import { createEventDispatcher } from "svelte";
  import { timestampToString } from "../../helper";

  const dispatch = createEventDispatcher();

  export let event;
  export let eventPics;
</script>

<style>
  #event-single {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: .5em;
  }

  header {
    padding-right: 5em;
  }

  h2 {
    color: #0a4ab3;
  }

  .row {
    display: flex;
    margin-bottom: 0.1rem;
  }

  .box {
    display: flex;
    flex-direction: column;
    min-width: 140px;
  }

  .label {
    font-size: 11px;
    color: #696969;
  }

  span {
    font-size: 11px;
    color: #000000;
  }

  .metrics-value {
    font-size: 13px;
    font-weight: bold;
  }

  .scroll {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 0.8em;
    overflow: hidden;
  }

  .products {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  img {
  max-width: 100%;
  max-height: 100%;
}

  .btn-back {
    position: absolute;
    right: 1.3em;
    top: 0;
  }

  @media (min-width: 1180px) {
    .products {
      margin-top: 1.4rem;
    }
  }
</style>

<div id="event-single">
  <button class="round btn-back" on:click={() => dispatch('reset')}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        d="M427 234.625H167.296l119.702-119.702L256 85 85 256l171 171
        29.922-29.924-118.626-119.701H427v-42.75z" />
    </svg>
  </button>

  <header>
    <div class="label">
      Selected Event
      <span>{event.Origin.EventCode}</span>
      of type
      <span>{event.PrimaryType}</span>
    </div>
    <h2>{event.Title}</h2>
  </header>
  <div class="row">
    <div class="box">
      <div class="label">Event Time</div>
      <span v-if="data" class="metrics-value type">
        {timestampToString(event.StartTime)}
      </span>
    </div>
    <div class="box">
      <div class="label">Activation Time</div>
      <span v-if="data" class="metrics-value">
        {timestampToString(event.Origin.ActivationTime)}
      </span>
    </div>
  </div>
  <div class="scroll">
    <h3>Event Pictures</h3>
    <div class="products">
      {#each $eventPics as pic}
        <img src={pic.ImageURL} alt="" />
      {/each}
    </div>
    <footer>
      <span>About | Impressum | Datenschutz</span>
    </footer>
  </div>
</div>
