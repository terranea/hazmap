<script>
  import { onMount } from "svelte";
  export let map;
  export let eventData;

  onMount(() => {
    map.addLayer({
      id: "event-data",
      type: "fill",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      },
      paint: {
        "fill-color": "#ff9900",
        "fill-opacity": 1
      }
      // filter: ["in", "layer", "EMSR308_01TEGERNBACH_GRA_v1_observed_event_a"]
    });
    return () => {};
  });

  $: {
    console.log("data changed", eventData)
    if(eventData && map.getSource("event-data")) map.getSource("event-data").setData(eventData);
  }
</script>
