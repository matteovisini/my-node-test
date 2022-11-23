console.log("script loaded");
let express = require("express");
let app = express();
let port = 3000;
let server = app.listen(port);
console.log ("running server on https://localhost" +port);
app.use(express.static("public"));

let serverSocket = require("socket.io");
let io = serverSocket(server);
io.on("connection", newConnection);

function newConnection(newSocket){
    console.log("a new pokemon has appeared")
}


