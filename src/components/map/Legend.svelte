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
      height: 20px;
      line-height: 20px;
  }

  img {
      width: 20px;
      margin-right: 3px;
  }

  .dot {
  height: 12px;
  width: 12px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin: 0;
  margin-right: 5px;
}

.low {
  background: #C58D3A;
}

.normal {
  background: #52B04A;
}

.high {
  background: #3A59C5;
}

</style>

<span>Legend</span>

<ul>
  <li><img src="icons/fire-sm.png" alt="fire" />Fire</li>
  <li><img src="icons/flood-sm.png" alt="flood" />Flood</li>
  <li><img src="icons/massm-sm.png" alt="Mass movement" />Mass movement</li>
  <li><img src="icons/storm-sm.png" alt="storm" />Storm</li>
  <li><img src="icons/earthquake-sm.png" alt="earthquake" />Earthquake</li>
  <li><img src="icons/other-sm.png" alt="other" />Other</li>
  <li><img src="icons/picture.png" alt="picture" />Note/Picture Location</li>
  <li><img src="icons/aoi.png" alt="event aoi" />Event AOI</li>
</ul>

<span>Gauge Stations</span>
<ul>
  <li><span class="dot normal"></span>normal water level</li>
  <li><span class="dot low"></span>low water level</li>
  <li><span class="dot high"></span>high water level</li>
  <li><span class="dot"></span>no current water level</li>
</ul>