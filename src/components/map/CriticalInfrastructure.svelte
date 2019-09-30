<script>
import { onMount } from "svelte";
export let map, popup;

onMount(() => {
  map.on("mouseenter", "kritis-0dk36v", e => {
    map.getCanvas().style.cursor = "pointer";
    let coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    popup.setLngLat(coordinates).setHTML(e.features[0].properties.type).addTo(map);
  });
  map.on("click", "kritis-0dk36v", e => {
    map.getCanvas().style.cursor = "pointer";
    let coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    popup.setLngLat(coordinates).setHTML(e.features[0].properties.type).addTo(map);
  });
  map.on("mouseleave", "kritis-0dk36v", e => {
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
      map.addLayer({
        id: e.target.name,
        type: "circle",
        source: {
          type: "vector",
          url: "mapbox://terranea.77o9mzfd"
        },
        "source-layer": "kritis-0dk36v",
        layout: {},
        filter: ["!=", "type", "Pharmacy"],
        paint: {
          "circle-radius": 4,
          "circle-opacity": 0.8,
          "circle-color": [
            "match",
            ["get", "type"],
            "Bridge",
            "#fbc1bc",
            "Hospital",
            "#5d1451",
            "School",
            "#d35656",
            "Wastewater",
            "#14868c",
            "Water Supply",
            "#2f416d",
            "Telecom Tower",
            "#BEEAF7",
            /* other */ "#ccc"
          ]
        }
      });
    }
  } else {
    map.setLayoutProperty(e.target.name, "visibility", "none");
  }
}
</script>

<label>
  <input type="checkbox" name="kritis-0dk36v" value="kritis-0dk36v" on:change={show}/>
  Critical Infrastructure
</label>