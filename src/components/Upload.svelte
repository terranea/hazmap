<script>
import Modal from "./Modal.svelte";
import { events, user, selectedEvent } from '../stores'
import { createEventDispatcher, onMount } from 'svelte';
import { db, storage } from '../firebase'
const dispatch = createEventDispatcher();

let showModal
let value = "hey"
let eventid;
let fileinput;
let filename;
let title;
let comment = "";
let selectedFile;

onMount(() => {
  console.log("MOUNT")
  if ($selectedEvent) eventid = $selectedEvent.uid
  return () => {
    console.log("UNMOUNT")
  }
})

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

function uploadNote() {
  if ($user && eventid && selectedFile) {
  let doc = {
    Title: title,
    Comment: comment,
    Event: eventid,
    User: $user.uid,
    // Longitude: payload.coords.longitude,
    // Latitude: payload.coords.latitude,
  }
  console.log(doc)
  // if (payload.coords.accuracy) doc.Accuracy = payload.coords.accuracy
  // if (payload.coords.altitude) doc.Altitude = payload.coords.altitude
  // if (payload.coords.heading) doc.Heading = payload.coords.heading
  let ref
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
    }).catch((error) => {
      console.log(error)
    })
}
}
</script>

<style>
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
  margin-bottom: 0.2rem;
}
</style>

<Modal on:close={() => dispatch('close')}>
  <h2 slot="header">create a note for</h2>
  <select name="events" bind:value={eventid}>
    <option disabled selected value> -- select an event -- </option>
    {#each $events as event}
     <option value="{event.uid}">{event.Origin.EventCode} - {event.Title}</option>
    {/each}
  </select>
  
<div class="file-upload">
  <input type="file" accept="image/*" on:change={onFileChanged} bind:this={fileinput} />
  <button class="btn-pic" on:click={() => fileinput.click()}>Take Picture</button>
  <span class="file-info">{filename}</span>
</div>
<!-- <span class="error" v-if="!$v.file.required">a picture is required</span> -->
<div class="form-group">
  <label for="ftitle">Title</label>
  <input
    id="ftitle"
    name="ftitle"
    type="text"
    placeholder="Title"
    bind:value={title}
  />
</div>

<div class="form-group">
  <label for="fcomment">Comment</label>
  <input
    type="text"
    name="comment"
    placeholder="Comment"
    bind:value={comment}
  />
</div>
<button on:click={uploadNote}>Upload</button>
</Modal>