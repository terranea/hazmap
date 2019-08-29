<script>
import Modal from "./Modal.svelte";
import { events, user, selectedEvent } from '../stores'
import { createEventDispatcher, onMount } from 'svelte';
import { db, storage } from '../firebase'
  import isLatLong from 'validator/lib/isLatLong';

const dispatch = createEventDispatcher();

let showModal
let eventid = null;
let fileinput = null;
let filename = "";
let title = "";
let comment = "";
let selectedFile = null;
let uploadClicked = false;
let uploadError = null;
let coordinates = {
  latitude: "",
  longitude: ""
}
let error = {
  picture: true,
  title: true,
  comment: true,
  eventid: true,
  coordinates: true,
}

onMount(() => {
  console.log("MOUNT")
  if ($selectedEvent) eventid = $selectedEvent.uid
  let locationWatcher
  if (navigator.geolocation) {
    const onSuccess = position => {
      console.log(position);
      coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        altitude: position.coords.altitude,
        accuracy: position.coords.accuracy,
        heading: position.coords.heading
      };
    };
    const onError = error => {
      switch (error.code) {
        case 0:
          this.locationError = "Geolocation Error: unknown error";
          break;
        case 1:
          this.locationError = "Geolocation Error: permission denied";
          break;
        case 2:
          this.locationError = "Geolocation Error: position unavailable";
          break;
        case 3:
          this.locationError = "Geolocation Error: timed out";
          break;
      }
    };
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    locationWatcher = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      options
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  return () => {
    console.log("UNMOUNT")
    if (locationWatcher) navigator.geolocation.clearWatch(locationWatcher)
  }
})

function onValueChange() {
  console.log("onValueChange")
  if (uploadClicked) {
    validate()
  }
}

function onFileChanged(e) {
  let file = e.target.files[0];
  filename = file.name;
  if (!title || title === "")
    title = file.name.substr(0, file.name.lastIndexOf("."));
  if (file.type.match(/image.*/)) {
    console.log("An image has been loaded");
    // Load the image
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let image = new Image();
      image.onload = () => {
        // Resize the image
        let canvas = document.createElement("canvas"),
          max_size = 700, // TODO : pull max size from a site config
          width = image.width,
          height = image.height;
        if (width > height) {
          if (width > max_size) {
            height *= max_size / width;
            width = max_size;
          }
        } else {
          if (height > max_size) {
            width *= max_size / height;
            height = max_size;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        let dataUrl = canvas.toDataURL("image/jpeg");
        let resizedImage = dataURLToBlob(dataUrl);
        selectedFile = resizedImage;
        onValueChange()
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);

    let dataURLToBlob = function(dataURL) {
      let BASE64_MARKER = ";base64,";
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        let parts = dataURL.split(",");
        let contentType = parts[0].split(":")[1];
        let raw = parts[1];

        return new Blob([raw], { type: contentType });
      }

      let parts = dataURL.split(BASE64_MARKER);
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;

      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    };
  }
}

function validate() {
  console.log(eventid)
  error = {
    picture: selectedFile ? true : false,
    title: title.length >= 5 ? true : false,
    comment: comment.length <= 400 ? true : false,
    eventid: eventid ? true : false,
    coordinates: isLatLong(coordinates.latitude + ',' + coordinates.longitude)
  }
  console.log(error)
  return Object.keys(error).every((k) => { return error[k] === true })
}

function uploadNote() {
  uploadClicked = true
  if (validate() && $user && eventid && selectedFile) {
  let doc = {
    Title: title,
    Comment: comment,
    Event: eventid,
    User: $user.uid,
    Longitude: coordinates.longitude,
    Latitude: coordinates.latitude
  }
  console.log(doc)
  // if (payload.coords.accuracy) doc.Accuracy = payload.coords.accuracy
  // if (payload.coords.altitude) doc.Altitude = payload.coords.altitude
  // if (payload.coords.heading) doc.Heading = payload.coords.heading
  // let ref
  db.collection('notes').add(doc)
    .then(data => data.id).then(key => {
      ref = key
      return storage.ref().child('eventpics/' + key + '-' + filename).put(selectedFile)
    }).then(snapshot => {
      return snapshot.ref.getDownloadURL()
    }).then(downloadURL => {
      console.log(downloadURL, ref)
      return db.collection('notes').doc(ref).update({ 'ImageURL': downloadURL })
    }).then(() => {
      console.log("Picture upload successfull")
      dispatch('close')
    }).catch((error) => {
      console.log(error)
      uploadError = error
    })
  }
}

function reset() {
eventid = null;
fileinput = null;
filename = "";
title = "";
comment = "";
selectedFile = null;
uploadClicked = false;
uploadError = null;
coordinates = {
  latitude: "",
  longitude: ""
}
error = {
  picture: true,
  title: true,
  comment: true,
  eventid: true,
  coordinates: true,
}
}
</script>

<style>
h2 {
  text-align: center;
}

select {
 width: 100%;
}

.file-upload {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding: 10px;
  background: rgb(238, 238, 238);
}

.btn-pic {
  margin-bottom: 5px;
  height: 50px;
  background: var(--color-main-green);
}

.form-group {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

input {
  min-width: 0;
  margin: 0;
}

input[type="file"] {
  display: none;
}

label {
  margin: 0.2em 0;
}

label span {
  font-size: 12px;
}

.btn-upload {
  margin-top: 0.6em;
}

.error {
  color: rgb(180, 77, 77);
  font-size: 12px;
  width: 100%;
  text-align: right;
}

.position {
  display: flex;
  flex-direction: row;
}

.position > div:first-child{
  margin-right: 0.2em;
}

.accuracy {
  margin: .2em 0;
  font-size: 14px;
  text-align: center;
}

</style>

<Modal on:close={() => dispatch('close')}>
<h2 slot="header">create a note</h2> 
<select name="events" bind:value={eventid} on:change={onValueChange}>
  <option disabled selected value> -- select an event -- </option>
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
<!-- <span class="error" v-if="!$v.file.required">a picture is required</span> -->
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
{#if coordinates.accuracy}
<span class="accuracy">Accuracy: {coordinates.accuracy} m</span>
{/if}
<button class="btn-upload" on:click={uploadNote}>Upload</button>
{#if uploadError}
<span class="error" style="text-align: center; margin-top: .5em;">upload error: {uploadError}</span>
{/if}
<button slot="buttons" on:click={reset}>Reset</button>

</Modal>