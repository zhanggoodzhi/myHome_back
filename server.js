const app = require('./serverShare');
const express = require('express')
const path = require('path')

app.get('*', function (req, res, next) {
    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if (agentID) {
        console.log('重定向');
        res.redirect('http://localhost:81/');
        return;
    }
    next();
})

app.use(express.static(path.join(__dirname, '../myHome_front/dist')));

app.listen(80, function () {
    console.log('服务器已开启，端口：' + 80);
})