var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
    userName: String,
    versionKey: false,
    notifications: [{
        notification: String      
    }]
});

//var userModel = mongoose.model('User', userSchema);

const Notification = module.exports = mongoose.model('notification', notificationSchema);