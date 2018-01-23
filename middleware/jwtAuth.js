const superSecret= require('../config');
const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var token = (req.body && req.body.authorization) || (req.query && req.query.authorization) || req.headers['authorization'];
    console.log(11,superSecret,token);
    if (token) {
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt
            .verify(token, superSecret, function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: '无效的token.'});
                } else {
                    // 如果验证通过，在req中写入解密结果
                    req.decoded = decoded;
                    //console.log(decoded);
                    next(); //继续下一步路由
                }
            });
    } else {
        // 没有拿到token 返回错误
        return res
            .status(403)
            .send({success: false, message: '没有找到token.'});
    }
};