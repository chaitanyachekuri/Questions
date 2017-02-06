var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var userSchema = new Schema({
    id: Number,
    qid: Number

});

var user = mongoose.model('user', userSchema);

module.exports = user;