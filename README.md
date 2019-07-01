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
2. copy SQL file to container `docker cp src/sqlQueries.sql postgres-graphql:/sqlQueries.sql`
3. execute SQL in container `docker exec postgres-graphql psql -U postgres -f sqlQueries.sql`
4. start server `node src/server.js`
    1. Don't forget change webpack dev server proxy in `vue.config` if your server\`s URL differs from `http://localhost:4000/graphql`
5. run app `npm run serve`