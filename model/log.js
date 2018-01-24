/**
 * 日志
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    text: {
        type: String
    },
    date: {
        type: String
    }
});

module.exports = mongoose.model('Log', UserSchema);