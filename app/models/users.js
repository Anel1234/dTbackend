var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName: String,
    versionKey: false,
    image: [{
        imageURL: String
    }]
});

//var userModel = mongoose.model('User', userSchema);

const User = module.exports = mongoose.model('User', userSchema);

// define our nerd model
// module.exports allows us to pass this to other files when it is called



// module.exports = mongoose.model('users', {
//     name : {type : String, default: ''}
// });