<script>
  import { onMount } from "svelte";

  function show() {
    console.log("show")
  }
</script>

<style>
  span {
    font-weight: bold;
    margin-left: 6px;
  }

  ul {
    list-style: none;
    margin: .5em;
    padding: 0;
  }

  li {
      display: flex; 
      align-items: center;
  }

  img {
      width: 20px;
      margin-right: 3px;
  }

</style>

<span>Filter Hazard Type</span>

<label>
  <input type="checkbox" name="cwl" value="cwl" on:change={show} />
  Fire
</label>
<label>
  <input type="checkbox" name="cwl" value="cwl" on:change={show} />
  Flood
</label>
<label>
  <input type="checkbox" name="cwl" value="cwl" on:change={show} />
  Mass movement
</label>
<label>
  <input type="checkbox" name="cwl" value="cwl" on:change={show} />
  Storm
</label>

<span>Filter Events</span>