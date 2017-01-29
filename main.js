
var httpProxy = require('http-proxy');
var config=require('./config.js')
var proxy = httpProxy.createProxyServer();
var serverArguments=process.argv;
console.log('serverArguments >> >> '+serverArguments);
var express=require('express');
var app=express();
var ChildProcess = require('child_process');
var PORT=serverArguments[2] || config.PORT || '80';


app.use(express.static(__dirname+'/public'));
app.listen(PORT,()=>{
	console.log('server is running on port '+PORT);
})

app.all('/',(req,res,err)=>{
	res.sendfile('/index.html');
})

app.all('/rest',(req,res,err)=>{
	console.log('we have call / ');
	var target=undefined;
	if(serverData && serverData.urlMappings && serverData.urlMappings.length>0){
		for(var count in serverData.urlMappings){
			if(serverData.urlMappings[count].url && serverData.urlMappings[count].isActive){
				target=serverData.urlMappings[count].url;
			}
		}
	}
	proxy.web(req,res,{target:target})
});

app.all('/updateServer',(req,res,err)=>{
	console.log(' inside update call');
	console.log(' inside update call'+req.param('parameters'));
	var clientParams=JSON.parse(req.param('parameters'));
	console.log('port '+clientParams.port);
	var cwd='';
	var serverName='';
	var serverPort='';

	if(clientParams.port=='6010'){
		cwd=__dirname+"/serverone/proxy-server-new/";
		serverName='ritu';
		serverPort='6010';
	}else if(clientParams.port=='6020'){
		cwd=__dirname+"/servertwo/proxy-server-new/";
        serverName='preeti';
        serverPort='6020';
	}
    var out = {};
    var execFile=ChildProcess.execFile;
    execFile('sh',[cwd+'/script.sh',serverName,serverPort],{cwd:cwd},(err,stdout,stderr)=>{
    	process.stdout.write('output >> >> '+stdout);
    	out['error']=err;
    	out['stdout']=stdout;
    	out['stderr']=stderr;
        // var exec=ChildProcess.exec;
        // exec('node server.js ritu 6010',{cwd:cwd},(err,stdout,stderr)=>{
        //     process.stdout.write('success >> >> '+stdout);
        //     process.stdout.write('err >> >> '+err);
        //     process.stdout.write('err 1  >> >> '+stderr);
        // })
    });
    res.send({"message : ":serverName+ "Server is running on port "+serverPort});

    // var args = "git status";
    // var exec = ChildProcess.exec;
    // exec(args, {cwd: cwd}, function (error, stdout, stderr) {
    //     out.error = error;
    //     out.stdout = stdout;
    //     out.stderr = stderr;
    //     console.log("this is my output >> >> "+JSON.stringify(out));
    //     res.send(out);
    // });
});

var serverData={
		urlMappings:[
			{"url":'127.0.0.1:6010',isActive:true,name:"preeti-local"},
			{"url":'127.0.0.1:6020',isActive:false,name:"ritu-local"}
		]
}


// var childProcess=require('child_process');
// var exec=childProcess.exec;
// exec('node server.js preeti 2020',{cwd:'./serverone/proxy-server-new'},(err,stdout,stderr)=>{
// 	process.stdout.write('success >> >> '+stdout);
// 	process.stdout.write('err >> >> '+err);
// 	process.stdout.write('err 1  >> >> '+stderr);
// })
// process.stdout.write('m done with one');
// exec('node server.js ritu 2022',{cwd:'./servertwo/proxy-server-new'},(err,stdout,stderr)=>{
//     process.stdout.write('success >> >> '+stdout);
//     process.stdout.write('err >> >> '+err);
//     process.stdout.write('err 1  >> >> '+stderr);
// })