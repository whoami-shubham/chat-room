const server = require('ws').Server;
let s = new server({port:3000});
var client=0;

s.on('connection',function(ws) {
	client++;
	ws.on('message',function(message){
		console.log('message :',message);
		if(message.trim()=="hi"){
			 ws.send("hello from the other side !");
		}
		else if(message.trim()=="bye"){
			 ws.send("see You Later !");
		}
        else{
        	 ws.send(message);
        }
	})
	ws.on('close',function(){
		client--;
		console.log('Total connections is '+client);
	})
	console.log('New Client Connected. Total clients:'+client);
})