<script>
  import { auth } from "../firebase";
  import { authState } from "rxfire/auth";
  import Modal from "./Modal.svelte";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { user, alert } from "../stores";
  import isEmail from "validator/lib/isEmail";

  let email = "";
  let password = "";
  let btnTxt = "Sign In";
  let showModal = false;
  let errorCode = "";
  let errorMessage = "";

  onMount(() => {
    auth.onAuthStateChanged(function(u) {
      if (u) {
        user.set(u);
      } else {
        user.set(null);
      }
    });
  });

  function login() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        showModal = false;
        alert.set("Login successful!");
      })
      .catch(function(error) {
        errorCode = error.code;
        errorMessage = error.message;
      });
  }

  function logout() {
    auth.signOut().then(() => {
      alert.set("Logout successful!");
    }) ;
  }

</script>

<style>
  form fieldset {
    border: none;
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  button {
    margin: 0 0.4em;
  }
</style>

{#if $user}
  <button on:click={logout}>Sign Out</button>
{:else}
  <button on:click={() => (showModal = true)}>Sign In</button>
{/if}
{#if showModal}
  <Modal on:close={() => (showModal = false)}>
    <h2 slot="header">Sign In</h2>

    <form on:submit|preventDefault={login}>
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          type="email"
          placeholder="Email"
          bind:value={email} />
      </fieldset>
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          type="password"
          placeholder="Password"
          bind:value={password} />
      </fieldset>
      {#if errorMessage}
        <p transition:fade={{ duration: 2000 }}>{errorMessage}</p>
      {/if}
      <button
        class="btn btn-lg btn-primary pull-xs-right"
        type="submit"
        disabled={!email || !password}>
        Sign in
      </button>
    </form>

  </Modal>
{/if}

<!-- <modal @close="showModal = false" v-if="showModal">
    <h3>Sign In</h3>
    <input type="text" v-model="name" placeholder="Name" v-if="signup" />
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" v-on:keyup.enter="login" required />
    <button class="btn-login" @click="login">Login</button>
    <p v-if="errorMsg">{{errorMsg}}</p>
  </modal> -->
