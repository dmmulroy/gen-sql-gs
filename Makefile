.PHONY: create-data

.DEFAULT: create-data

GS_DB_NAME ?= default_db_name

create-data: set-db-name
	node ./create_orgs.js
	node ./create_jwts.js
	node ./create_users.js

set-db-name:
	export GS_DB_NAME=$(GS_DB_NAME)
