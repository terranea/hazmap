<script>
  import { filter } from "../../stores";

  let fire = false;
  let flood = false;
  let massm = false;
  let storm = false;

  function change() {
    console.log("change");
    const types = [
      ...(fire ? ["fire", "wildfire", "forestfire"] : []),
      ...(flood ? ["flood"] : []),
      ...(massm ? ["mass movement"] : []),
      ...(storm ? ["storm"] : [])
    ];
    filter.set({ types: types });
  }
</script>

<style>
  span {
    font-weight: bold;
    margin-left: 6px;
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

<span>Filter Events</span>
