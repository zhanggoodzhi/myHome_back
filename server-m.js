const app = require('./serverShare');
const express = require('express')
const path = require('path')

app.get('*', function (req, res, next) {
    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if (agentID) {
        next();
    } else {
        console.log('重定向');
        res.redirect('http://localhost/');
        return;
    }
})

app.use(express.static(path.join(__dirname, '../myHome_mobile_front/dist')));

app.listen(81, function () {
    console.log('服务器已开启，端口：' + 81);
})