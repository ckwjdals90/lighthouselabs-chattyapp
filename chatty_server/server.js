// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const colourScheme = ["#0000ff", "#008080", "#800080", "#ffff00", "#ffa500", "#ff0080", "#d3d3d3", "#add8e6", "#00ff00", "#663300"]
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  for (let i = 0; i < wss.clients.length; i += 1) {
    wss.clients[i].send(JSON.stringify({
      type: "colourScheme",
      content: '#'+Math.floor(Math.random()*16777215).toString(16)
    }));
  }
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({
      type: "userCounter",
      content: wss.clients.length
    }));
  });

  ws.on('message', (message) => {
    let parsedMessage = JSON.parse(message);

    switch(parsedMessage.type) {
      case "postMessage":
        wss.clients.forEach((client) => {
          client.send(JSON.stringify({
            type: "incomingMessage",
            id: uuid.v1(),
            colourScheme: parsedMessage.colourScheme,
            username: parsedMessage.username,
            content: parsedMessage.content
          }));
        });
        break;

      case "postNotification":
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({
          type: "incomingNotification",
          content: parsedMessage.content
        }));
      });
      break;

      default:
      throw new Error("Unknown event type " + parsedMessage.type);
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
        type: "userCounter",
        content: wss.clients.length
      }));
    });
    console.log("client counter: ", wss.clients.length);
  });
});
