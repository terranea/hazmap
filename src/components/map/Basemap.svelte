<script>
  import { onMount } from "svelte";
  export let map;

  let title = "Satellite";

  function show(e) {
    if (map.getStyle().name === "Streets") {
      map.setStyle("mapbox://styles/mapbox/satellite-streets-v11");
      title = "Streets (default)";
    } else {
      map.setStyle("mapbox://styles/terranea/ck0cnu1ig01hw1csz6r5xfw0p");
      title = "Satellite";
    }
  }
</script>

<style>
  span {
    font-weight: bold;
    margin-left: 6px;
  }

  button {
    margin: 0.5em;
  }
</style>

<span>Basemap</span>

<button on:click={show}>{title}</button>
