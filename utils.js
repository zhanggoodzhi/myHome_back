const superSecret = 'zhanggoodzhi';
const Log = require('./model/log');
const moment = require('moment');
const addLog = function (text) {
    const now = moment().format("YYYY-MM-DD HH:mm");
    new Log({text, date: now}).save((err) => {
        if (err) {
            console.log('添加日志出错');
            return;
        }
        console.log('添加日志', text, now)
    })
}

module.exports = {
    superSecret,
    addLog
};