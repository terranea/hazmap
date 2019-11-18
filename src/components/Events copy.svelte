<script>
  import { getContext } from "svelte";
  import { mapbox, key } from "../mapbox.js";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const { getMap, getPopup } = getContext(key);
  const map = getMap();
  const popup = getPopup();

  export let events;

  $: geojson = {
    type: "FeatureCollection",
    features: events.map(el => {
      let feature = {
        type: "Feature",
        geometry: { coordinates: [el.Longitude, el.Latitude], type: "Point" }
      };
      feature.properties = {};
      feature.properties.uid = el.uid;
      feature.properties.Title = el.Title;
      feature.properties.PrimaryType = el.PrimaryType;
      return feature;
    })
  };

  $: {
    if (map.getSource("events")) {
      map.getSource("events").setData(geojson);
    }
  }

  onMount(() => {
    map.addSource("events", {
      type: "geojson",
      data: geojson
    });
    map.addLayer({
      id: "events",
      source: "events",
      type: "circle",
      paint: {
        "circle-radius": 9,
        "circle-color": [
          "match",
          ["get", "PrimaryType"],
          "Flood",
          "#007fff",
          "Earthquake",
          "#223b53",
          "Fire",
          "#ff9900",
          "Wildfire",
          "#ff9900",
          "Forest fire",
          "#ff9900",
          "Storm",
          "#3bb2d0",
          /* other */ "#ccc"
        ]
      }
    });

    map.on("mouseenter", "events", e => {
      var description = e.features[0].properties.Title;
      onMouseEnter(e, description);
    });
    map.on("mouseleave", "events", onMouseLeave);

    map.on("click", "events", function(e) {
      dispatch("select", e.features[0].properties);
    });

    map.on("style.load", function() {
      map.addSource("events", {
        type: "geojson",
        data: geojson
      });
      map.addLayer({
        id: "events",
        source: "events",
        type: "circle",
        paint: {
          "circle-radius": 9,
          "circle-color": [
            "match",
            ["get", "PrimaryType"],
            "Flood",
            "#007fff",
            "Earthquake",
            "#223b53",
            "Fire",
            "#ff9900",
            "Wildfire",
            "#ff9900",
            "Forest fire",
            "#ff9900",
            "Storm",
            "#3bb2d0",
            /* other */ "#ccc"
          ]
        }
      });
    });
  });

  function onMouseEnter(e, html) {
    map.getCanvas().style.cursor = "pointer";
    let coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    popup
      .setLngLat(coordinates)
      .setHTML(html)
      .addTo(map);
  }

  function onMouseLeave() {
    map.getCanvas().style.cursor = "";
    popup.setHTML("");
    popup.remove();
  }
</script>
