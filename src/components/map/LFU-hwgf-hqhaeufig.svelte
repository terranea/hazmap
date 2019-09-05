
<script>
export let map;

function show(e) {
  if (e.target.checked) {
    if (map.getLayer(e.target.name)) {
      map.setLayoutProperty(e.target.name, "visibility", "visible");
    } else {
      map.addLayer(
        {
          id: e.target.name,
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              "http://www.lfu.bayern.de/gdi/wms/hwrk/ueberschwemmungsgebiete?bbox={bbox-epsg-3857}&service=WMS&request=GetMap&version=1.1.1&format=image/png&srs=EPSG:3857&width=256&height=256&styles=&transparent=true&layers=hwgf_hqhaeufig"
            ],
            tileSize: 256
          },
          paint: {}
        },
        "aeroway-line"
      );
    }
  } else {
    map.setLayoutProperty(e.target.name, "visibility", "none");
  }
}
</script>

<label>
  <input type="checkbox" name="hwgf_hqhaeufig" value="hwgf_hqhaeufig" on:change={show} />
  Flood Risk - frequent
</label>