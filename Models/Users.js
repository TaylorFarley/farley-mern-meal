const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 5 },
    displayName: { type: String }
}, {
    collection: 'users'
  })

module.exports = mongoose.model('user', userSchema)
