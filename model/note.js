/**
 * 留言管理
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: String
    },
    account:{
        type:String
    }
});

module.exports = mongoose.model('Note', UserSchema);