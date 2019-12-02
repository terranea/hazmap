<script>
  export let map;
  export let firstSymbolId

  const layerID = "clc";
  let checked = false;

  export let refresh;
  $: if (refresh !== "") {
      show()
  }

  function show() {
    if (checked) {
      if (map.getLayer(layerID)) {
        map.setLayoutProperty(layerID, "visibility", "visible");
      } else {

        map.addLayer({
          id: layerID,
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              "https://sg.geodatenzentrum.de/wms_clc10_2012?bbox={bbox-epsg-3857}&service=WMS&request=GetMap&version=1.1.1&format=image/png&srs=EPSG:3857&width=256&height=256&styles=&transparent=true&layers=clc10"
            ],
            tileSize: 256
          },
          paint: {}
        }, firstSymbolId);
      }
    } else {
      if (map.getLayer(layerID)) {
        map.setLayoutProperty(layerID, "visibility", "none");
      }
    }
  }
</script>

<label>
  <input type="checkbox" bind:checked name=layerID value=layerID on:change={show} />
  Corine Land Cover
</label>
