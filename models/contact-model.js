const {Schema, model} = require('mongoose');

const contactSchema = new Schema({
    username: {type: String, required:true},
    emailid: {type: String, required:true},
    message: {type: String, required:true},
});

const Contact = new model('Contact', contactSchema);

module.exports = Contact;