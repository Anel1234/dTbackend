var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    image: [{
        imageURL: String
    }]
});

//var userModel = mongoose.model('User', userSchema);

const Image = module.exports = mongoose.model('Image', imageSchema);