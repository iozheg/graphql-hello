main:
		docker stop postgres-graphql
		docker run --rm -P --name postgres-graphql -e POSTGRES_PASSWORD=123456 -d -p 5432:5432 postgres
		sleep 3
		docker cp src/sqlQueries.sql postgres-graphql:/sqlQueries.sql
		docker exec postgres-graphql psql -U postgres -f sqlQueries.sql
		node src/server.js