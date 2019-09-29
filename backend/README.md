# HazMap Backend - CEMS Parser

This is the source code for the Copernicus EMS RSS Feed parser. [CEMS Feed](https://emergency.copernicus.eu/mapping/activations-rapid/feed)

The parser analyzes the RSS feed of Copernicus and stores all events in firestore that are not yet in the database.

You need to provide a **firebase-credentials.json** file to run the parser (see main.go constants). The parser is written in the go programming language and uses gofeed to analyze the rss feed.