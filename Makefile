
PROJECT=bigbyte-dash

tidy:
	-@echo tidy
	-@go mod tidy -compat=1.17

update:
	-@echo update packages
	-@go get -u

server: tidy update
	-@echo build to ./dist/$(PROJECT)
	-@go mod vendor
	-@go build -tags static -o ./dist/$(PROJECT)

webclient: 
	-@cd webclient/ && yarn build
