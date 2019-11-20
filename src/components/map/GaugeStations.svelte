<script>
  import { onMount } from "svelte";
  export let map, popup;
  let stations = { type: "FeatureCollection", features: [] };

  onMount(() => {
    map.on("mouseenter", "cwl", e => {
      fetchStationData(e.features[0].properties);
      map.getCanvas().style.cursor = "pointer";
      let coordinates = e.features[0].geometry.coordinates.slice();
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      popup
        .setLngLat(coordinates)
        .setHTML("")
        .addTo(map);
    });
    map.on("click", "cwl", e => {
      fetchStationData(e.features[0].properties);
      map.getCanvas().style.cursor = "pointer";
      let coordinates = e.features[0].geometry.coordinates.slice();
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      popup
        .setLngLat(coordinates)
        .setHTML("")
        .addTo(map);
    });
    map.on("mouseleave", "cwl", e => {
      map.getCanvas().style.cursor = "";
      popup.setHTML("");
      popup.remove();
    });
  });

  function show(e) {
    if (e.target.checked) {
      if (map.getLayer(e.target.name)) {
        map.setLayoutProperty(e.target.name, "visibility", "visible");
      } else {
        map.loadImage("gauge20.png", function(error, image) {
          if (error) throw error;
          map.addImage("gauge", image);
        });
        map.addLayer({
          id: e.target.name,
          type: "circle",
          source: {
            type: "geojson",
            data: stations
          },
          paint: {
            "circle-color": [
              "match",
              ["get", "stateMnwMhw"],
              "low",
              "#C58D3A",
              "normal",
              "#52B04A",
              "high",
              "#3A59C5",
              "#52B04A"
            ],
            "circle-radius": {
              base: 1,
              stops: [[5, 3], [22, 18]]
            }
          }
          // layout: {
          //   "icon-image": "gauge",
          //   "icon-size": 0.8
          //   },
        });
        fetchStations();
      }
    } else {
      map.setLayoutProperty(e.target.name, "visibility", "none");
    }
  }

  function fetchStations() {
    console.log("fetchstations");
    const url =
      "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json?includeTimeseries=true&includeCurrentMeasurement=true";
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        return jsonToGeojson(data);
      })
      .then(sta => {
        stations = sta;
        map.getSource("cwl").setData(stations);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function fetchStationData(props) {
    let url =
      "https://pegelonline.wsv.de/webservices/rest-api/v2/stations/" +
      props.uuid +
      "/W/currentmeasurement.json";
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let color = "#52B04A";
        switch (data.stateMnwMhw) {
          case "low":
            color = "#C58D3A";
            break;
          case "normal":
            color = "#52B04A";
            break;
          case "high":
            color = "#3A59C5";
            break;
          default:
            color = "#52B04A";
            break;
        }
        const html =
          "<h1>Water body: " +
          props.waterlong +
          "</h1>" +
          props.longname +
          "<h2>Water level: <b style='color: " +
          color +
          "'>" +
          data.value +
          " cm</b></h2>" +
          "<span>Measuring time: </br>" +
          data.timestamp +
          "</span>" +
          "</br><h2>Water level of the last 10 days:</h2>" +
          "<img class='img-gauge' src='https://pegelonline.wsv.de/webservices/rest-api/v2/stations/" +
          props.shortname +
          "/W/measurements.png?start=P10D&width=420&height=220'/>";
        popup.setHTML(html);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function jsonToGeojson(data) {
    const features = data.map(el => {
      let feature = {
        type: "Feature",
        geometry: { coordinates: [el.longitude, el.latitude], type: "Point" }
      };
      feature.properties = { ...el };
      feature.properties.stateMnwMhw =
        el.timeseries[0].currentMeasurement.stateMnwMhw;
      feature.properties.waterlong = el.water.longname;
      feature.properties.watershort = el.water.shortname;
      return feature;
    });
    return { type: "FeatureCollection", features: features };
  }
</script>

<style>
  :global(.img-gauge) {
    object-fit: cover;
    width: 100%;
  }
</style>

<label>
  <input type="checkbox" name="cwl" value="cwl" on:change={show} />
  Gauge Stations
</label>
