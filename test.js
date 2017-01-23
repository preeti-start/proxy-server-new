


var childProcess=require('child_process');

var execFile=childProcess.execFile;
var filepath=__dirname+'/script.sh';
console.log('filepath >> >> '+filepath);
var execFileResult=execFile('sh',[filepath],(err,stdout,stderr)=>{
	// console.log('final data '+stdout)
})
execFileResult.stdout.on('data',(data)=>{
	console.log('final data '+data)
})


// var spawn=childProcess.spawn;
// if(process.argv[2]==='child'){
// 	process.stdout.write('i m inside child');
// }else{
// 	var output=spawn(process.execPath,['test.js','child'],{
// 		stdio:'inherit' //ignore can also be used
// 	});
// 	// output.stdout.pipe(process.stdout);
// 	// output.stdout.on("data",(data)=>{
// 	// 	console.log('from child '+data);
// 	// })
// }


// var exec=childProcess.exec;
// // exec('cat test.js',(err,stdout,stderr)=>{
// // 	process.stdout.write('m done with cat commnad'+stdout);
// // });



hello test
