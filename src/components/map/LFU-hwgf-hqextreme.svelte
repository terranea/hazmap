<script>
  export let map;
  export let firstSymbolId

  function show(e) {
    if (e.target.checked) {
      if (map.getLayer(e.target.name)) {
        map.setLayoutProperty(e.target.name, "visibility", "visible");
      } else {
        map.addLayer({
          id: e.target.name,
          type: "fill",
          source: {
            type: "vector",
            url: "mapbox://terranea.28avbar4"
          },
          "source-layer": "hq20070",
          layout: {},
          paint: {
            "fill-color": "#74B3FF",
            "fill-opacity": 0.8
          }
        }, firstSymbolId);
      }
    } else {
      map.setLayoutProperty(e.target.name, "visibility", "none");
    }
  }
</script>

<label>
  <input
    type="checkbox"
    name=" hwgf_hqextreme"
    value=" hwgf_hqextreme"
    on:change={show} />
  Flood Risk - extreme
</label>
