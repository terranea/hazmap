<script>
import { onMount } from "svelte";
export let map, popup;
let stations = { "type": "FeatureCollection", "features": [] };

onMount(() => {
  map.loadImage('gauge20.png', function(error, image) {
    if (error) throw error;
    map.addImage('gauge', image);
  })

  map.on("mouseenter", "cwl", e => {
    fetchStationData(e.features[0].properties)
    map.getCanvas().style.cursor = "pointer";
    let coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    popup.setLngLat(coordinates).setHTML("").addTo(map);
  });
  map.on("click", "cwl", e => {
    fetchStationData(e.features[0].properties)
    map.getCanvas().style.cursor = "pointer";
    let coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    popup.setLngLat(coordinates).setHTML("").addTo(map);
  });
  map.on("mouseleave", "cwl", e => {
    map.getCanvas().style.cursor = "";
    popup.setHTML("");
    popup.remove();
  });
})

function show(e) {
  if (e.target.checked) {
    if (map.getLayer(e.target.name)) {
      map.setLayoutProperty(e.target.name, "visibility", "visible");
    } else {
      map.addLayer({
        id: e.target.name,
        type: "symbol",
        source: {
          type: "geojson",
          data: stations
        },
        layout: {
          "icon-image": "gauge",
          "icon-size": 1
          },
      });
      fetchStations()
    }
  } else {
    map.setLayoutProperty(e.target.name, "visibility", "none");
  }
}

function fetchStations() {
  console.log("fetchstations")
  const url = "https://pegelonline.wsv.de/webservices/rest-api/v2/stations.json"
  fetch(url)
    .then(response => {
      return response.json()
    }).then(data => {
      return jsonToGeojson(data)
    }).then(sta => {
      stations = sta
      map.getSource("cwl").setData(stations);
    }) 
    .catch(function (error) {
      console.log(error);
    })
}

function fetchStationData(props) {
  let url = "https://pegelonline.wsv.de/webservices/rest-api/v2/stations/" 
    + props.uuid + "/W/currentmeasurement.json";
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {
      const html = "<h1>" + props.waterlong + "</h1>" +
        props.longname + "<h2>Pegelstand: <b>" + data.value +
        " cm</b></h2>" + "<span>Mess-Zeitpunkt: </br>" +
        data.timestamp + "</span>";
      popup.setHTML(html);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function jsonToGeojson(data) {
  const features = data.map(el => {
    let feature = { type: "Feature", geometry: { coordinates: [el.longitude, el.latitude], type: "Point" } }
    feature.properties = {...el}
    feature.properties.waterlong = el.water.longname
    feature.properties.watershort = el.water.shortname
    return feature
  })
  return { "type": "FeatureCollection", "features": features }
}
</script>

<label>
  <input type="checkbox" name="cwl" value="cwl" on:change={show}/>
  Gauge Stations
</label>