const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let clientSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    gouvernement:{
        type:String,
        required:true,
    },
    adress:{
        type:String,
        required:true,
    },
    delegation:{
        type:String,
        required:true,
    },
    cementerie:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cementeries"
    }],
    produit:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TypeProduits"
    }],
    prix:[],
    phone:{
        type:String,
    },
    etatclient:{
      type: Boolean,
      default: true,
    },
    type_client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeclients"
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
    },
});


//Export the model
module.exports = mongoose.model('Clients', clientSchema);