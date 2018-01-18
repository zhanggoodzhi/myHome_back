const api = require('./api')
const express = require('express')
const compression = require('compression');  
const path = require('path')
const app = express()
const port = 80;
const bodyParser = require('body-parser');
app.use(compression()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// 设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHead' +
            'erFeild');
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use(api);
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, function () {
    console.log('服务器已开启，端口：' + port);
})