<script>
  import { onMount } from "svelte";

</script>

<style>
  span {
    font-weight: bold;
    margin-left: 6px;
  }

  ul {
    list-style: none;
    margin: .5em;
    padding: 0;
  }

  li {
      display: flex; 
      align-items: center;
  }

  img {
      width: 20px;
      margin-right: 3px;
  }

</style>

<span>Legend</span>

<ul>
<li><img src="icons/fire-sm.png" alt="fire" />Fire</li>
<li><img src="icons/flood-sm.png" alt="flood" />Flood</li>
<li><img src="icons/massm-sm.png" alt="Mass movement" />Mass movement</li>
<li><img src="icons/storm-sm.png" alt="storm" />Storm</li>
<li><img src="icons/picture.png" alt="picture" />Note/Picture Location</li>
<li><img src="icons/aoi.png" alt="event aoi" />Event AOI</li>
</ul>
