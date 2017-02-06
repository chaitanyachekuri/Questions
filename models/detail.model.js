var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var detailSchema = new Schema({
    id: Number,
    answer: Number,
    question: String,
    options: Array
        // {
            // fist: String,
            // second: String,
            // third: String,
            // fourth: String
        // }

})

var detail = mongoose.model('detail', detailSchema);

module.exports = detail;