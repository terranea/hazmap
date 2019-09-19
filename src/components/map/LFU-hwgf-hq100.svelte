
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
            url: "mapbox://terranea.0ud307d3"
          },
          "source-layer": "HQ100",
          layout: {},
          paint: {
            "fill-color": "#006FFF",
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
  <input type="checkbox" name="wms-hq100" value="wms-hq100" on:change={show} />
  Flood Risk - 100yr
</label>