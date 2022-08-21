package main

import(
	"github.com/ddailey/bigbyte-dash/server"
)

func main() {
	r := server.Init()
	r.Run()
}