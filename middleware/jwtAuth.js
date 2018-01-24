const utils = require('../utils');
const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');
const superSecret = utils.superSecret;
module.exports = function (req, res, next) {
    const token = (req.body && req.body.authorization) || (req.query && req.query.authorization) || req.headers['authorization'];
    if (token) {
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt
            .verify(token, superSecret, function (err, decoded) {
                if (err) {
                    return res
                        .status(403)
                        .send({success: false, message: 'token无效.'});
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