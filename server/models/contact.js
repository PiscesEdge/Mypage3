
let mongoose= require('mongoose');

//create a model class
let contactModel = mongoose.Schema({
    name: String,
    email: String,
    phone: Number
},
{
  collection:"contacts" //collection name in the db
})

module.exports= mongoose.model('Contact', contactModel);


