var express= require('express');
var app=express();
var path=require('path');
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);

var users=[];


//Set View Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

//Set Static Path

app.use(express.static(path.join(__dirname, 'public')));
//connext to socket
io.sockets.on('connection', function(socket){
  //set username
  socket.on('set user', function(data, callback){

     if(users.indexOf(data)!==-1){
         callback(false);
     }else{
         callback(true);
         socket.username=data;
         users.push(socket.username);
         updateUsers();
     }
  });

  function updateUsers(){
  	io.sockets.emit('users', users);
  }

  socket.on('send message', function(data){
    io.sockets.emit('show message', { msg: data, user: socket.username});
  });

  socket.on('disconnect', function(data){
  	if(!socket.username) return;
  	users.splice(users.indexOf(socket.username),1);
  	updateUsers();
  });
})
//index route

app.get('/', function(req, res){
	res.render('index')
});

server.listen(3000);
console.log('Server Started......');
