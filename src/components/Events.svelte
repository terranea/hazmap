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

    for (var i = 0; i < features.length; i++) {
      const coords = features[i].geometry.coordinates;
      const props = features[i].properties;
      const id = props.uid;

      let marker = markers[id];
      if (!marker) {
        const el = document.createElement("div");
        el.addEventListener("click", function(e) {
          dispatch("select", props);
        });
        el.addEventListener('mouseover', () => marker.togglePopup());
        el.addEventListener('mouseout', () => marker.togglePopup());
        switch (props.PrimaryType) {
          case "Wildfire":
            el.className = "fire-marker";
            break;
          case "Flood":
            el.className = "flood-marker";
            break;
          case "Storm":
            el.className = "storm-marker";
            break;
          case "Mass movement":
            el.className = "massm-marker";
            break;
          default:
            el.className = "marker";
            break;
        }
        marker = markers[id] = new mapbox.Marker({ element: el }).setLngLat(
          coords
        );
        marker.setPopup(
          new mapbox.Popup({ offset: 15 }).setHTML(
            "<span>" + props.Title + "</span>"
          )
        );

        marker.addTo(map);
      }
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
