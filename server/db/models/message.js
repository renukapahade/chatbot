var mongoose = require('mongoose');
var messageSchema = mongoose.Schema(
    {
        session_id: String,
        type: String,
        message: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Message', messageSchema);
