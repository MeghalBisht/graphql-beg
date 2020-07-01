const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schemas/schema')
const { MONGOURI } = require('./keys')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()


app.use(cors())

mongoose.connect(MONGOURI,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
 }
)
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(5000, () => {
    console.log('Port is up and running!');
})