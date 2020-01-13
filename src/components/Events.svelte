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

  function loadLayers() {
    const images = [
      { imageUrl: "icons/fire-sm.png", id: "fire" },
      { imageUrl: "icons/flood-sm.png", id: "flood" },
      { imageUrl: "icons/massm-sm.png", id: "massm" },
      { imageUrl: "icons/storm-sm.png", id: "storm" },
      { imageUrl: "icons/other-sm.png", id: "other" },
      { imageUrl: "icons/earthquake-sm.png", id: "earthquake"},
      { imageUrl: "icons/picture.png", id: "pic" }
    ];

    Promise.all(
      images.map(
        img =>
          new Promise((resolve, reject) => {
            map.loadImage(img.imageUrl, function(error, res) {
              map.addImage(img.id, res);
              resolve();
            });
          })
      )
    ).then(() => {
      map.addSource("events", {
        type: "geojson",
        data: geojson
      });
      map.addLayer({
        id: "events",
        source: "events",
        type: "symbol",
        layout: {
          "icon-image": [
            "match",
            ["get", "PrimaryType"],
            "Flood",
            "flood",
            "Fire",
            "fire",
            "Wildfire",
            "fire",
            "Forest fire",
            "fire",
            "Storm",
            "storm",
            "Wind storm",
            "storm",
            "Earthquake", "earthquake",
            "Mass movement",
            "massm",
            /* other */ "other"
          ],
          "icon-size": 0.5
        }
      });
    });
  }

  onMount(() => {
    loadLayers()

    map.on("mouseenter", "events", e => {
      var description = e.features[0].properties.Title;
      onMouseEnter(e, description);
    });
    map.on("mouseleave", "events", onMouseLeave);

    map.on("click", "events", function(e) {
      dispatch("select", e.features[0].properties);
    });

    map.on("style.load", function() {
      loadLayers();
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
