<script>
  export let map;

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
            url: "mapbox://terranea.dccf5c94"
          },
          "source-layer": "HQHaeufig",
          layout: {},
          paint: {
            "fill-color": "#004DA8",
            "fill-opacity": 0.8
          }
        });
      }
    } else {
      map.setLayoutProperty(e.target.name, "visibility", "none");
    }
  }
</script>

<label>
  <input
    type="checkbox"
    name="hwgf_hqhaeufig"
    value="hwgf_hqhaeufig"
    on:change={show} />
  Flood Risk - frequent
</label>
