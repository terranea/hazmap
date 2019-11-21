<script>
  import {
    eventSelection,
    selectedEvent,
    filteredEvents,
    eventData,
    eventNotes
  } from "../stores";
  import { onMount, setContext } from "svelte";
  import { mapbox, key } from "../mapbox";
  import Events from "./Events.svelte";
  import LFUHQ100 from "./map/LFU-hwgf-hq100.svelte";
  import LFUHQHF from "./map/LFU-hwgf-hqhaeufig.svelte";
  import LFUHQEX from "./map/LFU-hwgf-hqextreme.svelte";
  import CLC from "./map/CLC.svelte";
  import GAUGE from "./map/GaugeStations.svelte";
  import CRIS from "./map/CriticalInfrastructure.svelte";
  import BaseMap from "./map/Basemap.svelte";
  import Legend from "./map/Legend.svelte";
  import Filter from "./map/Filter.svelte";
  import EventData from "./map/EventData.svelte";

  setContext(key, {
    getMap: () => map,
    getPopup: () => popup
  });

  export let lat;
  export let lon;
  export let zoom;

  let container;
  let map;
  let popup;
  let loading = true;
  let layerId;
  let showLayers = false;
  let showLegend = false;
  let showFilter = false;
  let noteMarkers = [];
  let filter = {}

  $: if ($eventNotes && map && map.getSource("notes")) {
    let data = {
    type: "FeatureCollection",
    features: $eventNotes.map(el => {
      let feature = {
        type: "Feature",
        geometry: {
          coordinates: [el.Longitude, el.Latitude],
          type: "Point"
        }
      };
      feature.properties = {};
      feature.properties.uid = el.id;
      feature.properties.Title = el.Title;
      feature.properties.Event = el.Event;
      return feature;
    })
  };

    map.getSource("notes").setData(data);
  }

  $: {
    console.log($filteredEvents)
  }

  onMount(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";

    link.onload = () => {
      map = new mapbox.Map({
        container,
        style: "mapbox://styles/terranea/ck0cnu1ig01hw1csz6r5xfw0p",
        center: [lon, lat],
        trackResize: true,
        zoom,
        attributionControl: false
      });
      map.addControl(new mapbox.NavigationControl(), "top-right");
      map.addControl(
        new mapbox.AttributionControl({
          compact: true,
          customAttribution: "Icons by <a href='https://icons8.com'>Icons8</a>"
        }),
        "bottom-right"
      );

      popup = new mapbox.Popup({
        closeButton: false,
        closeOnClick: false
      });
      popup.setMaxWidth("350px");

      map.on("click", function(e) {
        showLayers = false;
      });

      map.on("load", function() {
        loading = false;
        map.addSource("notes", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          }
        });
        map.addLayer({
          id: "notes",
          source: "notes",
          type: "symbol",
          layout: {
            "icon-image": "pic",
            "icon-size": 0.7
          },
          paint: {
            "icon-color": "#00ff00"
          }
        });
      });
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });

  $: {
    if (!loading) {
      if ($eventSelection) {
        map.jumpTo({
          center: [$selectedEvent.Longitude, $selectedEvent.Latitude],
          zoom: 10
        });

        // for (let index = 0; index < $eventNotes.length; index++) {
        //   const element = $eventNotes[index];
        //   if(element.Longitude) {
        //   var marker = new mapbox.Marker()
        //     .setLngLat([element.Longitude, element.Latitude])
        //     .addTo(map);
        //   noteMarkers.push(marker)
        //   }
        // }
      } else {
        map.flyTo({ center: ["10.345759", "50.919992"], zoom: 5 });
        for (let index = 0; index < noteMarkers.length; index++) {
          const element = noteMarkers[index];
          element.remove();
        }
      }
    }
  }
</script>

<style>
  section {
    position: relative;
    flex: 1 1 auto;
    order: 0;
    box-sizing: border-box;
    outline: none;
  }

  .btn {
    position: absolute;
    left: 6px;
    z-index: 10;
    height: 32px;
    width: 32px;
    background: var(--color-main-green);
    padding: 0;
  }

  .btn-layers {
    top: 6px;
  }
  .btn-legend {
    top: 42px;
  }

  .btn-filter {
    top: 78px;
  }

  .btn:hover {
    background: #1d8640;
  }

  .switch {
    position: absolute;
    display: none;
    flex-direction: column;
    z-index: 10;
    top: 6px;
    left: 42px;
    background: white;
    border-radius: 5px;
  }

  .switch-legend {
    top: 42px;
  }

  .switch-filter {
    top: 78px;
  }

  .switch :global(label) {
    display: flex;
    align-items: center;
    margin: 0.5em;
  }

  .switch :global(input) {
    margin: 0;
    margin-right: 0.5em;
  }

  .visible {
    display: flex;
  }

  .layers-title {
    font-weight: bold;
    margin-left: 6px;
  }

  :global(input[type="checkbox"]) {
    width: 20px;
    height: 20px;
    background: #ddd;
    margin: 20px 90px;
    position: relative;
    box-shadow: none;
  }

  @media (min-width: 980px) {
    section {
      order: 1;
      overflow: hidden;
    }
  }
</style>

<section bind:this={container}>
  {#if !loading}
    <Events
      events={$filteredEvents}
      on:select={ev => eventSelection.setItem(ev.detail)} />

    <EventData {map} eventData={$eventData} />
  {/if}

  <button
    class="btn btn-layers"
    on:click={() => {
      showLayers = !showLayers;
      showLegend = false;
      showFilter = false;
    }}>
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="layersIconTitle"
      stroke="#fff"
      stroke-width="1.5"
      stroke-linecap="square"
      stroke-linejoin="miter"
      color="#2329D6">
      <title id="layersIconTitle">Layers</title>
      <path d="M12 4L20 8.00004L12 12L4 8.00004L12 4Z" />
      <path d="M20 12L12 16L4 12" />
      <path d="M20 16L12 20L4 16" />
    </svg>
  </button>
  <div class:visible={showLayers} class="switch">
    {#if !loading}
      <span class="layers-title">Layers</span>
      <LFUHQ100 {map} />
      <LFUHQHF {map} />
      <LFUHQEX {map} />
      <CLC {map} />
      <GAUGE {map} {popup} />
      <CRIS {map} {popup} />
      <BaseMap {map} />
    {/if}

    <!-- <button on:click={() => switchLayer('satellite-streets-v11')}>Satellite</button>
  <button on:click={() => switchLayer('streets-v11')}>Streets</button>
  <button>Kritis</button>
  <button>Pegel</button>
  <button>Risiko</button> -->
  </div>
  <button
    class="btn btn-legend"
    on:click={() => {
      showLegend = !showLegend;
      showLayers = false;
      showFilter = false;
    }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <title id="layersIconTitle">Legend</title>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  </button>

  <div class:visible={showLegend} class="switch switch-legend">
    {#if !loading}
      <Legend />
    {/if}
  </div>

  <button
    class="btn btn-filter"
    on:click={() => {
      showFilter = !showFilter;
      showLayers = false;
      showLegend = false;
    }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#fff"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <title id="layersIconTitle">Filter</title>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  </button>

  <div class:visible={showFilter} class="switch switch-filter">
    {#if !loading}
      <Filter />
    {/if}
  </div>

</section>
