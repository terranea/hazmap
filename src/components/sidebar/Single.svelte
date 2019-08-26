<script>
import { createEventDispatcher } from 'svelte';
import { timestampToString } from '../../helper'

const dispatch = createEventDispatcher();
export let event;
</script>

<style>
#event-single {
  display: flex;
  flex-direction: column;
  height: 100%;
}

header {
  height: 70px;
  padding-left: 10px;
  padding-top: 10px;
}

.content {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 10px;
  padding-right: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

h2 {
  color: #0a4ab3;
}

.row {
  display: flex;
  margin-bottom: .1rem;
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

.products{
  margin-top: .7rem;
}

.product {
  display: flex;
  flex-direction: column;
}

.btn {
  width: 100%;
  margin-bottom: 10px;
}

footer {
  margin-top: auto;
}

@media (min-width: 1180px) {
  .products {
    margin-top: 1.4rem;
  }

}
</style>

<div id="event-single">
  <button class="round btn-back" on:click="{() => dispatch('reset')}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M427 234.625H167.296l119.702-119.702L256 85 85 256l171 171 29.922-29.924-118.626-119.701H427v-42.75z"/></svg>
  </button>

  <header>
    <div class="label">Selected Event <span>{event.Origin.EventCode}</span> of type <span>{event.PrimaryType}</span></div>
    <h2>{event.Title}</h2>
  </header>
  <div class="content">
    <div class="row">
      <div class="box">
        <div class="label">Event Time</div>
        <span v-if="data" class="metrics-value type">{timestampToString(event.StartTime)}</span>
      </div>
      <div class="box">
        <div class="label">Activation Time</div>
        <span v-if="data" class="metrics-value">{timestampToString(event.Origin.ActivationTime)}</span>
      </div>
    </div>
    <div class="row">
      <div class="box">

      </div>
      <div class="box">
      </div>
    </div>
    <div class="products">
      <h3>Event Pictures</h3>
      <!-- <img :src="pic.ImageURL" alt="" v-for="(pic, index) in pictures" :key="index"> -->
    </div>
    <footer>
      <span>About | Impressum | Datenschutz</span>
    </footer>
  </div>
</div>