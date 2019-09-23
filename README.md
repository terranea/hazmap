# HazMap app

The HazMapp app supports the management of natural hazards and disaster events by providing its users data from complementing European and national open sources including that collected through crowdsourcing. The app aggregates actionable information and allows professional users (civil protection, water and environmental management, policy makers) but also citizens to effectively prevent and react against disasters. 

The HazMapp app integrates information from Copernicus EMS with data from complementing open sources and allows users to collect hazard related information through geo-tagged photos and annotations directly in the field.

## Source Code

This folder/repository includes the source code for the hazmap app. A running prototype lives at https://hazmap-terranea.netlify.com/.

The app was created as a single page app and uses the following open source technologies:
User Interface and interactivity: [Svelte](https://svelte.dev/)
Map rendering: [Mapbox Gl JS](https://docs.mapbox.com/mapbox-gl-js/api/)
Data sync and authentication: [Firebase js sdk](https://github.com/firebase/firebase-js-sdk)

Data storage: [Cloud Firestore](https://firebase.google.com/docs/firestore)
Picture and file storage: [Cloud Storage](https://firebase.google.com/docs/storage)
User authentication and authorization: [Firebase Authentication](https://firebase.google.com/docs/auth)

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

## Get started

Install the dependencies...

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

```bash
cd hazmap
npm install
```

...then run the development server to start the app:

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running.


## Build the app

Run the build command to deploy it on the web:

```bash
npm run build
```

all neessary files are located in the folder "public"
