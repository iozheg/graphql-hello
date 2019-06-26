# graphql-hello

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


1. start postrges in docker:
`sudo docker run --rm -P --name postgres-graphql -e POSTGRES_PASSWORD=123456 -d -p 5432:5432 postgres`
2. execute SQL `psql -h localhost -p 5432 -U postgres -f projects/graphql-hello/src/sqlQueries.sql`
3. start server `node src/server.js`