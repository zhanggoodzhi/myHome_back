const jwt = require('jsonwebtoken');
const User = require('../model/user');
const utils = require('../utils');
const superSecret = utils.superSecret;
module.exports = function (router) {
    // 登录接口
    router.post('/account/login', (req, res) => {
        User
            .findOne({
                account: req.body.account
            }, function (err, user) {
                if (err) 
                    throw err;
                if (!user) {
                    res.json({success: false, message: '没有该用户,请先注册'});
                } else if (user) {
                    if (user.psd != req.body.psd) {
                        res.json({success: false, message: '密码错误'});
                    } else {
                        const token = jwt.sign({
                            account: user.account,
                            psd: user.psd,
                            ifAdmin: user.ifAdmin,
                            alias: user.alias
                        }, superSecret, {
                            expiresIn: 60 *60 // 授权时效60分钟
                        });
                        res.json({
                            success: true,
                            ifAdmin: user.ifAdmin,
                            account: user.account,
                            alias: user.alias,
                            message: '登录成功',
                            token: token
                        });
                        utils.addLog(`${user.alias} 登录了系统，欢迎！`);
                    }
                }
            });
    })

    // 注册接口
    router.post('/account/register', (req, res) => {
        console.log('注册：', req.body);
        const data = Object.assign({
            ifAdmin: false
        }, req.body);
        User.findOne({
            account: req.body.account
        }, function (err, user) {
            if (err) 
                throw err;
            if (user) {
                res.json({success: false, message: '已有该用户名,请更换用户名再注册'});
                return;
            }
            new User(data).save((err) => {
                if (err) {
                    res.send(err);
                    return;
                }
                delete data.rePsd;
                const token = jwt.sign(data, superSecret, {
                    expiresIn: 60 *60 // 授权时效60分钟
                });
                const authData = {};
                Object
                    .keys(data)
                    .forEach(v => {
                        if (v === "psd") {
                            return;
                        }
                        authData[v] = data[v];
                    });
                res.json(Object.assign({
                    message: '注册成功',
                    success:true,
                    token: token
                }, authData));
                utils.addLog(`欢迎 ${req.body.alias} 成为新用户！`);
            })
        });

    })

    // 查询所有用户
    router.get('/api/getUsers', (req, res) => {
        User.find({}, {
            __v: 0
        }, (err, users) => {
            if (err) {
                res.send(err)
                return
            }
            res.json(users);
        })
    })

    // 删除用户
    router.post('/api/deleteUser', (req, res) => {
        User.remove({
            _id: req.body.id
        }, (err) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json({message: '删除用户成功'})
        })
    })
}