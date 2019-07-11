package main

import (
	// "fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./static")))

	http.HandleFunc("/api/dict", func(w http.ResponseWriter, r *http.Request) {
		word, _ := r.URL.Query()["word"]
		// fmt.Println(word)

		resp, err := http.Get("https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20190701T101303Z.dafa63742b72fae9.1dcc3719765500bcdf8dde83aea159dbd61c1206&lang=en-ru&text=" + word[0])
		if err != nil {
			log.Fatal(err)
		}
		// fmt.Print(resp)
		worddef, _ := ioutil.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			log.Fatal(err)
		}
		// fmt.Printf("%s", worddef)

		w.Header().Set("Content-Type", "application/json")
		w.Write(worddef)
	})
	http.ListenAndServe("0.0.0.0:8080", nil)
}
