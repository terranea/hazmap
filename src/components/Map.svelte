<script>
  import { events, eventSelection } from "../stores";
  import { onMount, setContext } from "svelte";
  import { mapbox, key } from "../mapbox";
  import Events from "./Events.svelte";

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

  onMount(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";

    link.onload = () => {
      map = new mapbox.Map({
        container,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lon, lat],
        trackResize: true,
        zoom
      });
      map.addControl(new mapbox.NavigationControl(), "top-right");
      // map.addControl(new mapbox.AttributionControl(), "bottom-left");
      popup = new mapbox.Popup({
        closeButton: false,
        closeOnClick: false
      });
      map.on("load", function() {
        loading = false;
      });
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });
</script>

<style>
  section {
    position: relative;
    flex: 1;
    order: 0;
  }

  div {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 980px) {
    section {
      order: 1;
      overflow: hidden;
    }
  }
</style>

<section>
  <div bind:this={container}>
    {#if !loading}
      <Events events={$events} on:select={(ev) => eventSelection.setItem(ev.detail)} />
    {/if}
  </div>
</section>
