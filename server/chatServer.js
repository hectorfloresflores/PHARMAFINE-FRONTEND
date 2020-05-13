var app = require('./app');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000'); //3200
app.set('port', port);

var server = http.createServer(app);

var io = require('socket.io').listen(server);

io.on('connection', (socket) => { //nueva conexión
  //config interna (no archivo)
  console.log('new connection made.');

  socket.on('join', function (data) {
    socket.join(data.room);
    console.log(data.user + ' joined the room: ' + data.room);
    socket.broadcast.to(data.room).emit('new user joined', {
      user: data.user,
      message: 'has joined this room.'
    });
  });


  socket.on('leave', function (data) {
    console.log(data.user + ' left the room: ' + data.room);
    socket.broadcast.to(data.room).emit('left room', {
      user: data.user,
      message: 'has left this room.'
    });
    socket.leave(data.room);
  });

  socket.on('message', function (data) { //envío de data (user y msj) dentro del evento 
    io.in(data.room).emit('new message', {
      user: data.user,
      message: data.message
    }); //mandarlo dentro del room (que será un user)
  })

  socket.on('user', function (data) {
    io.in('conection').emit('new user', {
      user: data.user
    }); //intento de enviar users creados 
    //io.in(data.room).emit('new user', {user:data.user});
  })
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  //debug('Listening on ' + bind);
}
