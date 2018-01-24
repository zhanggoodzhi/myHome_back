/**
 * 用户管理
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    account: {
        type: String
    },
    alias: {
        type: String
    },
    psd: {
        type: String
    },
    ifAdmin: {
        type: Boolean
    }
});

module.exports = mongoose.model('User', UserSchema);