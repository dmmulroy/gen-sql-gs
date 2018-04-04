.PHONY: create-data set-db-name

.DEFAULT: create-data

GS_DB_NAME ?= default_db_name

create-data: set-db-name
	node ./create_orgs.js
	node ./create_jwts.js
	node ./create_users.js
	node ./create_permissions.js
	node ./create_roles.js
	node ./create_role_permissions.js
	node ./create_user_roles.js

set-db-name:
	export GS_DB_NAME=$(GS_DB_NAME)
