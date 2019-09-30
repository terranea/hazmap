<script>
  import { createEventDispatcher } from "svelte";
  import { timestampToString } from "../../helper";

  const dispatch = createEventDispatcher();

  export let event;
  export let notes;
</script>

<style>
  #event-single {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0.5em;
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
    min-height: 38px;
    justify-content: space-between;
  }

  .box {
    display: flex;
    flex-direction: column;
    min-width: 140px;
  }

  .label {
    font-size: 13px;
    color: #696969;
    margin: 0.3em 0;
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
    width: 100%;
    object-fit: cover;
    margin-bottom: .4em;
  }

  .btn-back {
    position: absolute;
    right: 1.3em;
    top: 0;
  }

  .note {
    margin: 0.4em 0em;
    background: #fff;
    /* height: 70px; */
    /* min-height: 78px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: .5em;
  }

  .txt {
    margin: .2em .4em;
    font-size: .8em;
    color: #696969;
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
    <h2>{event.Title}</h2>
    <div class="label">
      Selected Event
      <span>{event.Origin.EventCode}</span>
      of type
      <span>{event.PrimaryType}</span>
    </div>
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
    <div class="row">
    <div class="box">
      <div class="label">Latitude</div>
      <span v-if="data" class="metrics-value type">
        {event.Latitude}
      </span>
    </div>
    <div class="box">
      <div class="label">Longitude</div>
      <span v-if="data" class="metrics-value">
        {event.Longitude}
      </span>
    </div>
  </div>
  <div class="scroll">
    <h3>Event Notes and Pictures</h3>
    <div class="products">
      {#each $notes as note}
        <div class="note">
          <img src={note.ImageURL} alt="" />
          <div class="txt">Title: {note.Title}</div>
          <div class="txt">Comment: {note.Comment}</div>
        </div>
      {/each}
    </div>
  </div>
</div>
