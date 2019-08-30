

<Modal on:close={() => dispatch('close')}>
<h2 slot="header">create a note</h2> 
<div class="tooltip" class:show={locationError ? false : true} slot="header">
  <svg height="25" fill="#fc8181" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C141.2 48 48 141.2 48 256s93.2 208 208 208 208-93.2 208-208S370.8 48 256 48zm21 312h-42V235h42v125zm0-166h-42v-42h42v42z"/></svg>
  <span class="tooltiptext">{locationError}</span>
</div>
<select name="events" bind:value={eventid} on:change={onValueChange} bind:this={select}>
  <option disabled selected value="none"> -- select an event -- </option>
  {#each $events as event}
    <option value="{event.uid}">{event.Origin.EventCode} - {event.Title}</option>
  {/each}
</select>
{#if !error.eventid}
<span class="error">please select an event.</span>
{/if}
  
<div class="file-upload">
  <input type="file" accept="image/*" on:change={onFileChanged} bind:this={fileinput} />
  <button class="btn-pic" on:click={() => fileinput.click()}>Take Picture</button>
  <span class="file-info">{filename}</span>
  {#if !error.picture}
  <span class="error">a picture is required</span>
  {/if}
</div>
<div class="form-group">
  <label for="ftitle">Title <span>for your note</span></label>
  <input
    id="ftitle"
    name="ftitle"
    type="text"
    placeholder="Title"
    bind:value={title}
    on:input={onValueChange}
  />
  {#if !error.title}
  <span class="error">the title must have at least 5 characters.</span>
  {/if}
</div>

<div class="form-group">
  <label for="fcomment">Comment</label>
  <input
    type="text"
    name="comment"
    placeholder="Comment"
    bind:value={comment}
    on:input={onValueChange}
  />
  {#if !error.comment}
  <span class="error">the comment max length is 400 characters.</span>
  {/if}
</div>
<div class="position">
  <div class="form-group">
    <label for="lat">Latitude</label>
    <input
      id="lat"
      type="number"
      placeholder="Latitude"
      bind:value={coordinates.latitude}
      on:input={onValueChange}
    />
  </div>
  <div class="form-group">
    <label for="lon">Longitude</label>
    <input
      id="lon"
      type="number"
      placeholder="Longitude"
      bind:value={coordinates.longitude}
      on:input={onValueChange}
    />
  </div>
</div>
{#if !error.coordinates}
<span class="error">please provide a valid latitude-longitude coordinate.</span>
{/if}
<span class="accuracy">Accuracy: {coordinates.accuracy} m</span>
<button class="btn-upload" on:click={uploadNote}><svg height="32" style="margin-right: 1em;" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M403.002 217.001C388.998 148.002 328.998 96 256 96c-57.998 0-107.998 32.998-132.998 81.001C63.002 183.002 16 233.998 16 296c0 65.996 53.999 120 120 120h260c55 0 100-45 100-100 0-52.998-40.996-96.001-92.998-98.999zM288 276v76h-64v-76h-68l100-100 100 100h-68z"/></svg> Upload</button>
{#if uploadError}
<span class="error" style="text-align: center; margin-top: .5em;">upload error: {uploadError}</span>
{/if}
<button slot="buttons" on:click={reset}>Reset</button>

</Modal>