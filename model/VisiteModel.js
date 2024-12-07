const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true,
    },
    responsable:{
        type:String,
        required:true,
    },
    type_client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeclients"
    },
    observation:{
        type:String,
        required:true,
    },
    reclamation:{
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
});

//Export the model
module.exports = mongoose.model('User', userSchema);