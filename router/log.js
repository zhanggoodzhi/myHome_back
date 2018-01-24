const Log = require('../model/log');

module.exports = function (router) {
    // 查询所有用户
    router.get('/api/getLogs', (req, res) => {
        Log.find({
        }, {
            __v: 0
        }, (err, logs) => {
            if (err) {
                res.send(err)
                return
            }
            res.json(logs);
        })
    })
}