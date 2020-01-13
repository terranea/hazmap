<script>
  import { filter } from "../../stores";

  let fire = true;
  let flood = true;
  let massm = true;
  let storm = true;
  let earthquake = true;
  let other = true;
  let world = false;

  function change() {
    console.log("change", world);
    const types = [
      ...(!fire ? ["fire", "wildfire", "forestfire"] : []),
      ...(!flood ? ["flood"] : []),
      ...(!earthquake ? ["earthquake"] : []),
      ...(!massm ? ["mass movement"] : []),
      ...(!storm ? ["storm", "wind storm"] : []),
      ...(!other ? ["other"] : [])
    ];
    filter.set({ types: types, world: world });
  }
</script>

<style>
  span {
    font-weight: bold;
    margin-left: 6px;
  }

.switch-field {
	display: flex;
	margin-bottom: 6px;
  overflow: hidden;
  padding: 5px;
}

.switch-field input {
	position: absolute !important;
	clip: rect(0, 0, 0, 0);
	height: 1px;
	width: 1px;
	border: 0;
	overflow: hidden;
}

.switch-field label {
  background-color: #e4e4e4;
  box-sizing: border-box;
	color: rgba(0, 0, 0, 0.6);
	font-size: 12px;
	line-height: 1;
	text-align: center;
	padding: 6px 10px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
	transition: all 0.1s ease-in-out;
}

.switch-field label:hover {
	cursor: pointer;
}

.switch-field input:checked + label {
	background-color: #29bb5a;
	box-shadow: none;
}

.switch-field label:first-of-type {
	border-radius: 4px 0 0 4px;
}

.switch-field label:last-of-type {
	border-radius: 0 4px 4px 0;
}
</style>

<span>Filter Hazard Type</span>

<label>
  <input type="checkbox" name="cwl" bind:checked={fire} on:change={change} />
  Fire
</label>
<label>
  <input type="checkbox" name="cwl" bind:checked={flood} on:change={change} />
  Flood
</label>
<label>
  <input type="checkbox" name="cwl" bind:checked={massm} on:change={change} />
  Mass movement
</label>
<label>
  <input type="checkbox" name="cwl" bind:checked={storm} on:change={change} />
  Storm
</label>
<label>
  <input type="checkbox" name="cwl" bind:checked={earthquake} on:change={change} />
  Earthquake
</label>
<label>
  <input type="checkbox" name="cwl" bind:checked={other} on:change={change} />
  Other
</label>

<span>Filter Events</span>

	<div class="switch-field">
		<input type="radio" id="radio-one" name="switch-one" bind:group={world} value={false} checked on:change={change}/>
		<label for="radio-one">Germany</label>
		<input type="radio" id="radio-two" name="switch-one" bind:group={world} value={true} on:change={change}/>
		<label for="radio-two">World</label>
	</div>
