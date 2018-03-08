import http from 'http'
const port=4000

http.createServer(function (req,res) {
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.write('index.js')
    console.log(res)
    res.end()
}).listen(port)

console.log('Start server on '+port+'!')