<script>
  import Modal from "./Modal.svelte";
  import { showAbout } from '../stores'

  let show = "About";
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

  .container {
    z-index: 50;
  }
</style>

<button on:click={() => (showAbout.set({show: true, title: "About"}))}>About</button>

{#if $showAbout.show}
  <Modal on:close={() => (showAbout.set({show: false, title: "About"}))}>
    <h1 slot="header">{$showAbout.title}</h1>
    <div>
      {#if $showAbout.title == 'About'}
        <div class="wrapper">
          <p>
            The HazMap app integrates information from Copernicus EMS with data
            from complementing open sources and allows users to collect hazard
            related information through geo-tagged photos and annotations
            directly in the field.
          </p>

          <img
            height="100"
            loading="lazy"
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

          <h1>EOVALUE</h1>
          <p>
            This application has been developed within the EOVALUE project,
            which has received funding from the European Union’s Horizon 2020
            research and innovation programme. The JRC, or as the case may be
            the European Commission, shall not be held liable for any direct or
            indirect, incidental, consequential or other damages, including but
            not limited to the loss of data, loss of profits, or any other
            financial loss arising from the use of this application, or
            inability to use it, even if the JRC is notified of the possibility
            of such damages.
          </p>

          <img src="eovalue.png" loading="lazy" alt="EOVALUE" />

          <p>
          Icons by <a href='https://icons8.com'>Icons8</a>
          </p>

        </div>
      {:else if $showAbout.title == 'Disclaimer'}
        <div class="wrapper">
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
      {:else if $showAbout.title == 'Data Policy'}
        <div class="wrapper">
          <p>
            This policy is intended to inform the users of this
            website about the nature, scope and purpose of the collection and
            use of personal data by the HazMap app.
          </p>
          <h2>Google Firebase</h2>
          <p>
            Our HazMap app uses the technology Google Firebase of the company
            Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA
            ("Firebase"). We use following Firebase services:
          </p>
          <ul>
            <li>Cloud Firestore: to store and sync data</li>
            <li>Storage: to store files like pictures</li>
            <li>Authentication: to authenticate users</li>
          </ul>
          <p>
            Google Firebase uses servers located in Frankfurt for these services
            wherever possible. However, it cannot be ruled out that data may
            also be transferred to the USA. Google has therefore submitted to
            the EU-US Privacy-Shield.
          </p>
          <p>
            You can find more information about Google Firebase and privacy
            here:
            <a
              href="https://firebase.google.com/support/privacy/"
              target="_blank">
              https://firebase.google.com/support/privacy/
            </a>
          </p>
        </div>
      {:else}
        <div class="wrapper">
          <p>
            These Terms of Use govern your use of HazMap and provide information
            about the HazMap upload service. When you create an HazMap account
            or use HazMap,
            <strong>you agree to these terms.</strong>
          </p>
          <h2>Permissions you give to us when uploading data</h2>
          <p>
            <strong>
              We do not claim ownership of your content, but you grant us a
              license to use it.
            </strong>
            With the transfer of photos to the hazmap app you help to build up a
            database for disaster response. You agree to share the photos under
            the following
            <a
              href="https://joinup.ec.europa.eu/collection/eupl/eupl-text-11-12"
              target="_blank">
              European Union Public Licence V1.2
            </a>
            .
          </p>
          <p>
            As the licensor, you hereby grant a worldwide, royalty-free,
            non-exclusive, sublicensable license, which entitles the user, for
            the period of validity of the copyrights to the original work:
          </p>
          <ul>
            <li>to use the data without restriction</li>
            <li>to reproduce the data</li>
            <li>change the original data and create edits based on the data</li>
            <li>
              to make the data publicly available, which includes the right to
              make the data or reproductions thereof publicly available or
              perceptible, or to perform the data publicly, as far as possible
            </li>
            <li>to distribute the data or reproductions thereof</li>
            to distribute the data or reproductions thereof
            <li>to rent or lend out the data or copies thereof</li>
            <li>to further license the data or reproductions thereof</li>
          </ul>
          <p>
            Please read the
            <a
              href="https://joinup.ec.europa.eu/collection/eupl/eupl-text-11-12"
              target="_blank">
              License
            </a>
            carefully.
          </p>
        </div>
      {/if}
    </div>

    <div slot="buttons">
      <button
        on:click={() => {
          title = 'About';
          showAbout.set({show: true, title: "About"})
        }}>
        About
      </button>
      <button
        on:click={() => {
          title = 'Terms of Use';
          showAbout.set({show: true, title: "Terms of Use"})
        }}>
        Terms
      </button>
      <button
        on:click={() => {
          title = 'Data Policy';
          showAbout.set({show: true, title: "Data Policy"})
        }}>
        Data
      </button>
      <button
        on:click={() => {
          showAbout.set({show: true, title: "Disclaimer"})
        }}>
        Disclaimer
      </button>
    </div>
  </Modal>
{/if}
