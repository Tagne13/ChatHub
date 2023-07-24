const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use("/images", express.static(path.join(__dirname, "../client/images")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// const io = require('socket.io')(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: 'http://localhost:3001',
//   }
// });

// io.on('connection', (socket) => {
//   console.log('Connected to socket.io!');
//   socket.on('setup', (userData) => {
//     socket.join(userData._id);
//     socket.emit('connected');
//   });

//   socket.on('join chat', (room) => {
//     socket.join(room);
//     console.log('User Joined Room: ' + room);
//   });
//   socket.on('typing', (room) => socket.in(room).emit('typing'));
//   socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

//   socket.on('new message', (newMessageReceived) => {
//     var chat = newMessageReceived.chat;

//     if (!chat.users) return console.log('chat.users not defined');

//     chat.users.forEach((user) => {
//       if (user.id == newMessageReceived.sender._id) return;

//       socket.in(user._id).emit('message received', newMessageReceived);
//     });
//   });

//   socket.off('setup', () => {
//     console.log('USER DISCONNECTED');
//     socket.leave(userData._id);
//   });
// });

// Call the async function to start the server
startApolloServer();
