/**
 * 用户管理
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    admin: {
        type: String
    },
    alias:{
        type: String
    },
    psd: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);