let http = require('http')
let express = require('express')
let app = express()
let User = require('./model/user.js')
const port = 4000

//引入全局变量
require('./public/js/global.js')

app.get('/', function(req, res) {
    const query = req.query;
    res.send('Hello ' + query.name);
});

app.all('/regist', function(req, res) {
    console.log('user:', User)
    if (!User.find({ username: /admin/ })) {

        let user1 = new User({ username: 'admin', password: 123456 })
        user1.save(function(err, doc) {
            console.log(doc);
        })
        return res.send(PayloadSuccess())
    }else{
        return res.send(PayloadException('BUSINESS_ERROR'),'已有同名账户，无法重复注册，请知悉！')
    }
});

let server = app.listen(port, function() {
    let add = server.address
    let host = add.address
    let port = server.port

    console.log('Example app listening at http://%s:%s', host, port);
})

console.log('Start server on ' + port + '!')