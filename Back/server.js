const express = require('express');
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schemas/index');

const app = express();


app.use(cors())


app.use('/', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(4000, () => console.log('Server running'))