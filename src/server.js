var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('./graphql-server/graphqlSchema');

var app = express();
// app.options("*", (req, res, next) => {
//   // console.log(req);
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Credentials', true)
//   next();
// });
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next()
// });
// app.get('/graphql', (req, res, next) => {
//   res.send(req);
// })
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));