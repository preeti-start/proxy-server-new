

var serverArguments=process.argv;
console.log('server arguments > >> '+serverArguments)
var serverName=serverArguments[2];
var portName=serverArguments[3];
var express=require('express');
var app=express();
var ChildProcess = require('child_process');


app.use(express.static(__dirname+'/public'));
app.all('/rest',(req,res,err)=>{
	console.log(serverName+' inside the / call');
    res.send('Hii i m '+serverName+' server running on port '+portName);
	
})


app.listen(portName,()=>{
	console.log(serverName+' server is running at port '+portName)
})

