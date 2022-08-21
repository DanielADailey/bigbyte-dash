
PROJECT=bigbyte-dash

tidy:
	-@go mod tidy -compat=1.17

update:
	-@go get -u

build:
	-@go build -tags static -o ./dist/$(PROJECT)