<script>
  export let map;
  export let firstSymbolId;

  const layerID = "wms-HQ100";
  let checked = false;

  export let refresh;
  $: if (refresh !== "") {
    show();
  }

  function show() {
    if (checked) {
      if (map.getLayer(layerID)) {
        map.setLayoutProperty(layerID, "visibility", "visible");
      } else {
        map.addLayer(
          {
            id: layerID,
            type: "fill",
            source: {
              type: "vector",
              url: "mapbox://terranea.0ud307d3"
            },
            "source-layer": "HQ100",
            layout: {},
            paint: {
              "fill-color": "#006FFF",
              "fill-opacity": 0.8
            }
          },
          firstSymbolId
        );
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
    name="layerID"
    value="layerID"
    on:change={show} />
  Flood Risk - 100yr
</label>
