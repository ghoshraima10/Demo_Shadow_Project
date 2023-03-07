var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var schema = require('../schema/Schema')
const cors = require('cors');

console.log(schema);
// Construct a schema, using GraphQL schema language


var app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(5000);
console.log('Running a GraphQL API server at http://localhost:5000/graphql');