let express = require('express')
let app = express()
let bodyParser = require('body-parser')
const port = 4000

//引入全局变量
require('./common/global.js')

app.use(bodyParser.json())

//挂载路由
let router = require('./router/index.js')
app.use('',router)
app.use(express.static(__dirname + '/public'));

let server = app.listen(port, function() {
    let add = server.address()
    console.log(add)
    let host = add.address
    let p = add.port

    console.log('Example app listening at http://%s:%s', host, p);
})

console.log('Start server on ' + port + '!')