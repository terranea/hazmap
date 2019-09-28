package main

import (
	"context"
	"fmt"
	"os"
	"strings"
	"time"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"

	"github.com/mmcdole/gofeed"
	"golang.org/x/net/html"
)

type Event struct {
	Timestamp        time.Time `json:"timestamp"`
	Title            string    `json:"title"`
	Name             string    `json:"name"`
	Description      string    `json:"description"`
	Countries        string    `json:"countries"`
	PrimaryType      string    `json:"primarytype"`
	SpecificType     string    `json:"specifictype"`
	ActivationStatus string    `json:"activationstatus"`
	AffectedArea     string    `json:"affectedarea"`
	AffectedPeople   string    `json:"affectedpeople"`
	Latitude         string    `json:"latitude"`
	Longitude        string    `json:"longitude"`
	StartTime        time.Time `json:"starttime"`
	EndTime          time.Time `json:"endtime"`
	Origin           Origin    `json:origin`
}

type Origin struct {
	Name           string            `json:"name"`
	URL            string            `json:"url"`
	EventCode      string            `json:"eventcode"`
	ActivationTime time.Time         `json: activation`
	Custom         map[string]string `json:"custom"`
}

const fbcollection = "events"

func main() {
	fmt.Println("START PARSER")
	feed := fromURL()
	events := []Event{}

	for index := 0; index < len(feed.Items); index++ {
		item := feed.Items[index]
		coords := parseGeoRSS(item)
		i := strings.Index(item.Title, "]")
		title := item.Title
		if i >= 0 {
			title = strings.TrimSpace(item.Title[i+1:])
		}
		cat := item.Categories[0]
		if cat == "Forest fire, wild fire" {
			cat = "Wildfire"
		}
		e := Event{
			Title:       title,
			PrimaryType: item.Categories[0],
			Timestamp:   time.Now(),
			Latitude:    coords["lat"],
			Longitude:   coords["lon"],
			Origin: Origin{
				Name:      "CEMS",
				URL:       item.Link,
				EventCode: item.GUID,
				Custom:    map[string]string{},
			},
		}
		parseDescription(item.Description, &e)
		// fmt.Println(e.Title, e.Latitude, e.Longitude)
		events = append(events, e)
	}
	fmt.Println(len(events), "events parsed")
	err := sendToFirebase(events)
	if err != nil {
		fmt.Println(err)
	}
}

func sendToFirebase(e []Event) error {
	opt := option.WithCredentialsFile("../firebase-credentials.json")
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: "mazmap-ff7f7"}
	app, err := firebase.NewApp(ctx, conf, opt)
	if err != nil {
		return fmt.Errorf("error initializing app: %v", err)
	}
	client, err := app.Firestore(ctx)
	if err != nil {
		return fmt.Errorf("error creating database client: %v", err)
	}
	defer client.Close()
	ecount := 0
	excount := 0
	fmt.Println("START sending events to firestore collection", fbcollection)
	for _, item := range e {
		if item.Latitude == "" && item.Longitude == "" {
			continue
		}

		// check if event is already in the database
		iter := client.Collection(fbcollection).Where("Origin.EventCode", "==", item.Origin.EventCode).Limit(1).Documents(ctx)
		all, err := iter.GetAll()
		if err != nil {
			return err
		}
		if len(all) > 0 {
			excount++
			continue
		}

		// send event to the database
		_, _, err = client.Collection(fbcollection).Add(ctx, item)
		if err != nil {
			// Handle any errors in an appropriate way, such as returning them.
			return fmt.Errorf("An error has occurred: %s", err)
		}
		ecount++
	}
	fmt.Println(excount, "events were already in the database")
	fmt.Println(ecount, "new events have been sent to firestore")

	return nil
}

func parseDescription(d string, e *Event) {
	z := html.NewTokenizer(strings.NewReader(d))
	foundBold := false
	attr := []string{}

tagloop:
	for {
		tt := z.Next()
		switch {
		case tt == html.ErrorToken:
			// End of the document, we're done
			break tagloop
		case tt == html.StartTagToken:
			t := z.Token()

			isBold := t.Data == "b"
			if isBold {
				foundBold = true
			}
		case tt == html.EndTagToken:
			t := z.Token()
			isBold := t.Data == "b"
			if isBold {
				foundBold = true
			}
		case tt == html.TextToken:
			if foundBold {
				// fmt.Println(z.Token().Data)
				val := strings.TrimSpace(z.Token().Data)
				if last := len(val) - 1; last >= 0 && (val[last] == ';' || val[last] == ':') {
					val = val[:last]
				}
				attr = append(attr, val)
				foundBold = false
			}
		}
	}
	// fmt.Println(attr)
	layout := "2006-01-02 15:04:05"
	for i := 0; i < len(attr); i++ {
		switch attr[i] {
		case "Type of Event":
			e.SpecificType = attr[i+1]
		case "Date/Time of Event (UTC)":
			t, err := time.Parse(layout, attr[i+1])
			if err != nil {
				fmt.Println(err)
				break
			}
			e.StartTime = t
		case "Activation Date/Time (UTC)":
			t, err := time.Parse(layout, attr[i+1])
			if err != nil {
				fmt.Println(err)
				break
			}
			e.Origin.ActivationTime = t
		case "Affected Country":
			e.Countries = attr[i+1]
		case "Affected Area":
			e.AffectedArea = attr[i+1]
		case "Event Description":
			e.Description = attr[i+1]
		}
	}

}

func parseGeoRSS(i *gofeed.Item) map[string]string {
	c := make(map[string]string)
	v := strings.Fields(i.Extensions["georss"]["point"][0].Value)
	c["lat"] = v[0]
	c["lon"] = v[1]
	return c
}

func fromFile(f string) *gofeed.Feed {
	file, _ := os.Open(f)
	defer file.Close()
	fp := gofeed.NewParser()
	feed, _ := fp.Parse(file)
	return feed
}

func fromURL() *gofeed.Feed {
	fp := gofeed.NewParser()
	feed, _ := fp.ParseURL("https://emergency.copernicus.eu/mapping/activations-rapid/feed")
	return feed
}
