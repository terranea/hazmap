<script>
import { onMount } from "svelte";
export let map, popup;

onMount(() => {
  map.on("mouseenter", "kritis-8faop6", e => {
    map.getCanvas().style.cursor = "pointer";
    let coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    popup
      .setLngLat(coordinates)
      .setHTML(e.features[0].properties.type)
      .addTo(map);
  });
  map.on("mouseleave", "kritis-8faop6", e => {
    map.getCanvas().style.cursor = "";
    popup.setHTML("");
    popup.remove();
  });
})


function show(e) {
  if (e.target.checked) {
    if (map.getLayer(e.target.name)) {
      map.setLayoutProperty(e.target.name, "visibility", "visible");
    } else {
      console.log("layer not there")
    }
  } else {
    map.setLayoutProperty(e.target.name, "visibility", "none");
  }
}
</script>

<label>
  <input type="checkbox" name="kritis-8faop6" value="kritis-8faop6" on:change={show}/>
  Critical Infrastructure
</label>