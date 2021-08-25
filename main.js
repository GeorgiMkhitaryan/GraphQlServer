const express = require('express')
const cors = require('cors')
const userRoute = require('./Routes/userRoute')
const mainRoute = require('./Routes/index')
const mongoose = require('mongoose')
const userResolver = require('./resolvers/userResolver')
const schema = require('./Schema/index')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginInlineTrace } = require('apollo-server-core')

const startServer = async () => {
  const app = express()
  app.use(cors())

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: [userResolver],
    fetchOptions: {
      mode: 'no-cors',
    },
    cors: {
      origin: true,
    },
    plugins: [ApolloServerPluginInlineTrace()],
  })

  await server.start()
  server.applyMiddleware({ app, cors: false })

  await mongoose.connect('mongodb+srv://slackApp:ZhTb3sK4bTpou15g@cluster0.utizo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  const PORT = 5000
  app.listen({ port: PORT }, () => {
    console.log(`server started on port ${PORT}`)
  })
  
  function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }
  next();
}
  app.use(ignoreFavicon);

  app.use('/api/users', userRoute)
  app.use('/', mainRoute)
}

startServer()
