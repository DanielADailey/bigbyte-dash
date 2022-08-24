
PROJECT=bigbyte-dash
VERSION=v0.0.1

PROJECT := $(addsuffix -$(VERSION),$(PROJECT))

tidy:
	-@echo tidy
	-@go mod tidy -compat=1.17

update:
	-@echo update packages
	-@go get -u

server: tidy update
	-@rm dist/*
	-@echo build to ./dist/$(PROJECT)
	-@go mod vendor
	-@go build -tags static -o ./dist/$(PROJECT)

webclient: 
	-@cd webclient/ && yarn build
