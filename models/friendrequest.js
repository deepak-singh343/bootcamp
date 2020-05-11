//require mongoose and create schema for friendrequest
const mongoose = require('mongoose');
const friendrequestSchema = new mongoose.Schema({
    // the user who sent sends request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // the user to whom request is sent
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
});

const FriendRequest = mongoose.model('FriendRequest', friendrequestSchema);
module.exports = FriendRequest;
