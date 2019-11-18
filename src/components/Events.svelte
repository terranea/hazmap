<script>
  import { getContext } from "svelte";
  import { mapbox, key } from "../mapbox.js";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const { getMap, getPopup } = getContext(key);
  const map = getMap();

  var markers = {};
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
    map.on("mouseenter", "events", e => {
      var description = e.features[0].properties.Title;
      onMouseEnter(e, description);
    });
    map.on("mouseleave", "events", onMouseLeave);

    map.on("click", "events", function(e) {
      dispatch("select", e.features[0].properties);
    });

    map.on("style.load", function() {
      console.log("STLE LODED");
    });

    updateMarkers();
  });

  function updateMarkers() {
    var features = geojson.features;
    console.log("UPDATE", features.length);

    // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
    // and add it to the map if it's not there already
    for (var i = 0; i < features.length; i++) {
      var coords = features[i].geometry.coordinates;
      var props = features[i].properties;
      var id = props.uid;

      var marker = markers[id];
      if (!marker) {
        var el = document.createElement("div");
        console.log(props)
        switch (props.PrimaryType) {
          case "Wildfire":
            el.className = "fire-marker";
            break;
          case "Flood":
            el.className = "flood-marker"
            break;
          case "Storm":
            el.className = "storm-marker"
            break;
          case "Mass movement":
            el.className = "massm-marker"
            break;
          default:
            el.className = "marker"
            break;
        }
        marker = markers[id] = new mapbox.Marker({ element: el }).setLngLat(
          coords
        );
      }

      marker.addTo(map);
    }
  }

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
