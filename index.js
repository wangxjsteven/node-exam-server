let express = require('express')
let app = express()
let http = require('http').Server(app);
let io = require('socket.io')(http);
const soc = require('./socket/socket.js')

let bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser')
const port = 4000

//引入全局变量
require('./common/global.js')

app.use(bodyParser.json())
app.use(cookieParser())

//挂载路由
let router = require('./router/index.js')
app.use('', router)
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    soc(socket, io)
    // console.log('a user connected');
    // socket.on('disconnect', function(){
    //   console.log('user disconnected');
    // });
    // socket.on('joinGame', function(user){
    //   console.log('joinGame user:',user);
    //   socket.emit('setExamInfo',{exam:{},antagonist:{}})
    // });
});

let server = http.listen(port, function() {
    let add = server.address()
    let host = add.address
    let p = add.port

    console.log('Example app listening at http://%s:%s', host, p);
})

console.log('Start server on ' + port + '!')