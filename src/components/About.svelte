<script>
  import Modal from "./Modal.svelte";

  let showModal = false;
  let about = true;
  let title = "About";
</script>

<style>
  .wrapper {
    height: 400px;
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  img {
    width: 100%;
    object-fit: scale-down;
  }
</style>

<button on:click={() => (showModal = true)}>About</button>

{#if showModal}
  <Modal on:close={() => (showModal = false)}>
    <h1 slot="header">{title}</h1>
    <div class="wrapper">
      {#if about}
        <div class="about">
          <p>
            The HazMap app integrates information from Copernicus EMS with data
            from complementing open sources and allows users to collect hazard
            related information through geo-tagged photos and annotations
            directly in the field.
          </p>

          <img
            height="100"
            src="http://terranea.de/assets/images/terranea-logo-final.gif"
            alt="Logo Terranea" />
          <p>
            At Terranea we are 'spatialists' creating innovative location-based
            applications supporting businesses and governments in fulfilling
            their daily duties.
          </p>

          <a
            href="http://terranea.de"
            target="blank"
            style="margin-right: 2em;">
            Terranea.de
          </a>
          <a href="https://github.com/terranea" target="blank">Github</a>

          <p>
            Terranea UG (haftungsbeschränkt)
            <br />
            Bahnhofstr. 120
            <br />
            82269 Geltendorf
            <br />
            Germany
          </p>

          <h1>EOVALUE & European Commission</h1>
          <p>
            This application has been developed within the EOVALUE project,
            which has received funding from the European Union’s Horizon 2020
            research and innovation programme. The JRC, or as the case may be
            the European Commission, shall not be held liable for any direct or
            indirect, incidental, consequential or other damages, including but
            not limited to the loss of data, loss of profits, or any other
            financial loss arising from the use of this application, or
            inability to use it, even if the JRC is notified of the possibility
            of such damages .
          </p>

          <img src="eovalue.png" alt="EOVALUE" />
          <img src="ec-logo-horiz-web_en.jpg" alt="EC Logo" />

        </div>
      {:else}
        <div class="imprint">
          <p>
            <strong>Online-contents</strong>
            - The author reserves the right not to be responsible for the
            topicality, correctness, completeness or quality of the information
            provided. Liability claims regarding damage caused by the use of any
            information provided, including any kind of information which is
            incomplete or incorrect, will therefore be rejected.
          </p>

          <p>
            <strong>Referrals and links</strong>
            - The Author is not responsible for any contents linked or referred
            to from his pages – unless he has full knowlegde of illegal contents
            and would be able to prevent the visitors of his site from viewing
            those pages. If any damage occurs by the use of information
            presented there, only the author of the respective pages might be
            liable, not the one who has linked to these pages. Furthermore the
            author is not liable for any postings or messages published by users
            of discussion boards, guestbooks or mailinglists provided on his
            page.
          </p>
          <p>
            <strong>Copyright</strong>
            - The author intended not to use any copyrighted material for the
            publication or, if not possible, to indicate the copyright of the
            respective object. The copyright for any material created by the
            author is reserved. Any duplication or use of such as images,
            diagrams, sounds or texts in other electronic or printed
            publications is not permitted without the author’s agreement.
          </p>

          <p>
            <strong>Legal force of this disclaimer</strong>
            - This disclaimer is to be regarded as part of the internet
            publication which you were referred from. If sections or individual
            formulations of this text are not legal or correct, the content or
            validity of the other parts remain uninfluenced by this fact.
          </p>
        </div>
      {/if}
    </div>

    <div slot="buttons">
      <button
        on:click={() => {
          about = true;
          title = 'About';
        }}>
        About
      </button>
    </div>
    <div slot="buttons">
      <button
        on:click={() => {
          about = false;
          title = 'Disclaimer';
        }}>
        Disclaimer
      </button>
    </div>
  </Modal>
{/if}
