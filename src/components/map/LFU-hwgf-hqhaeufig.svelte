<script>
  export let map;
  export let firstSymbolId;

  const layerID = "hwgf_hqhaeufig";
  let checked = false;

  export let refresh;
  $: if (refresh !== "") {
    show();
  }

  function show(e) {
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
              url: "mapbox://terranea.dccf5c94"
            },
            "source-layer": "HQHaeufig",
            layout: {},
            paint: {
              "fill-color": "#004DA8",
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
  Flood Risk - frequent
</label>
