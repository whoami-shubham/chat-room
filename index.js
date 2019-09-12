const WebSocket = require('ws');
let s = new WebSocket.Server({port:80});
var client=0;
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
users = {};
s.on('connection',function(ws,req) {
	client++;
	const ip = req.connection.remoteAddress;
	users[ip] = getRandomColor();
	var color = users[ip];
	ws.on('message',function(message){
         color = users[ip];
		console.log('message :',message);
		s.clients.forEach(function e(user){
			if(user!=ws){
				user.send('<span style='+`color:${color};`+'>'+ ip +' : </span>'+message);
			}
		});

	})
	ws.on('close',function(){
		//this.send('<span style="color:yellow;">'+'<span style="color:red;">' + ip+ '</span>'+  ' Leaved the chat room .</span>');
		s.clients.forEach(function e(user){
			if(user!=ws){
				user.send('<span style="color:yellow;">'+'<span style='+ `color:${color}` + '>' + ip+ '</span>'+  ' Leaved the chat room .</span>');
			}
		});
		client--;
		delete users[ip];
		console.log('We lost a Client. Total connections is '+client);
	})
	s.clients.forEach(function e(user){

			if(user!=ws){
				user.send('<span style="color:white;">'+'<span style='+ `color:${color}` + '>' + ip+ '</span>'+  ' Entered the chat room .</span>');

			}
			else{
				user.send('<span style="color:white;">'+'<span style='+ `color:${color}` +'> You : '+'</span>'+  ' Entered the chat room .</span>');

			}
		});
	console.log('New User Connected. Total Connections:'+client);

})

