const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

const apiRoutes = require('./routes/apiRoutes');


const app = express();

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
const io = require('socket.io')(server);
io.on('connection', (socket)=>{
  console.log("a user connected");
  socket.on("disconnect", ()=>{
    console.log("client disconnected")
  });
  socket.on("color", (color)=>{
    console.log(color);
    socket.broadcast.emit("color",color)
  })
})

app.use("/api", apiRoutes);

app.get("*", function(req,res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
})

server.listen(PORT, function(){
  console.log(`server listening on port ${PORT}`);
})
