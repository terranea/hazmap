<script>
  import { onMount } from "svelte";
  export let map, popup;

  const layerID = "kritis-0dk36v";
  let checked = false;

  export let refresh;
  $: if (refresh !== "") {
    show();
  }

  onMount(() => {
    map.on("mouseenter", layerID, e => {
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
    map.on("click", layerID, e => {
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
    map.on("mouseleave", layerID, e => {
      map.getCanvas().style.cursor = "";
      popup.setHTML("");
      popup.remove();
    });
  });

  function show() {
    if (checked) {
      map.zoomTo(7)
      if (map.getLayer(layerID)) {
        map.setLayoutProperty(layerID, "visibility", "visible");
      } else {
        map.addLayer({
          id: layerID,
          type: "circle",
          source: {
            type: "vector",
            url: "mapbox://terranea.77o9mzfd"
          },
          "source-layer": layerID,
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
      if (map.getLayer(layerID)) {
        map.setLayoutProperty(layerID, "visibility", "none");
      }
    }
  }
</script>

<label>
  <input
    type="checkbox"
    bind:checked
    on:change={show} />
  Critical Infrastructure
</label>
