.PHONY: create-data set-db-name clean

.DEFAULT: create-data

GS_DB_NAME ?= default_db_name

create-data: clean set-db-name
	node ./create_orgs.js
	node ./create_jwts.js
	node ./create_users.js
	node ./create_permissions.js
	node ./create_roles.js
	node ./create_role_permissions.js
	node ./create_user_roles.js
	node ./create_hour_requirements.js
	node ./create_user_gpa.js
	node ./create_study_log_entries.js
	cat ./sql/orgs.sql ./sql/jwts.sql ./sql/users.sql ./sql/permissions.sql ./sql/roles.sql ./sql/role_permissions.sql ./sql/user_roles.sql ./sql/hour_requirements.sql ./sql/user_gpa.sql ./sql/hour_requirements.sql >> ./sql/master.sql

set-db-name:
	export GS_DB_NAME=$(GS_DB_NAME)

clean:
	rm -f ./sql/*.sql
	rm -f ./json/*.json
