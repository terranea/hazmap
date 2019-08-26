<script>
  import { getContext } from "svelte";
  import { mapbox, key } from "../mapbox.js";
  import { onMount } from 'svelte';

  const { getMap } = getContext(key);
  const map = getMap();

  export let events;

  $: geojson = { "type": "FeatureCollection", "features": events.map(el => {
        let feature = { type: "Feature", geometry: { coordinates: [el.Longitude, el.Latitude], type: "Point" } }
        feature.properties = {}
        feature.properties.uid = el.uid
        feature.properties.Title = el.Title
        feature.properties.PrimaryType = el.PrimaryType
        return feature
      }) }

  	onMount(() => {
      console.log("HEY Mount")
	});
  

  // if (map.getLayer("events")) {
  //   console.log("EVENTS EXIST");
  //   map.getSource("events").setData(events);
  // } else {
  //   this.map.addSource("events", {
  //     type: "geojson",
  //     data: this.events
  //   });
  //   this.map.addLayer({
  //     id: "events",
  //     source: "events",
  //     type: "circle",
  //     paint: {
  //       "circle-radius": 10,
  //       "circle-color": [
  //         "match",
  //         ["get", "PrimaryType"],
  //         "Flood",
  //         "#007fff",
  //         "Earthquake",
  //         "#223b53",
  //         "Fire",
  //         "#ff9900",
  //         "Wildfire",
  //         "#ff9900",
  //         "Forest fire",
  //         "#ff9900",
  //         "Storm",
  //         "#3bb2d0",
  //         /* other */ "#ccc"
  //       ]
  //     }
  //   });
  // }
</script>
