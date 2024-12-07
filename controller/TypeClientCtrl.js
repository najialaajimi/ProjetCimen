const TypeClientModels = require("../model/typeclientModels");


const typeclientCtrl={
    AjouterTypeClient: async (req, res) => {
        try {
          let { name , code} = req.body;
          let typeclient = await TypeClientModels.findOne({ name });
          if (typeclient) return res.status(400).json({ msg: "typeclient deja existe" });
          let newtypeclient = new TypeClientModels({ name, code });
          newtypeclient.save();
          res.json({ result: newtypeclient });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      getAllTypeClient: async (req, res) => {
        try {
          let typeclient = await TypeClientModels.find();
          return res.status(200).json(typeclient);
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      gettypeclientById: async (req, res) => {
        try {
          let id = req.params.id;
          let typeclient = await TypeClientModels.findById({ _id: id });
          if (!typeclient) return res.status(400).json({ msg: "typeclient n'existe pas" });
          res.json({ result: typeclient });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
      ModifierTypeClient: async (req, res) => {
        try {
          let { name, code } = req.body;
          let typeclientUpdate = await TypeClientModels.findByIdAndUpdate(
            { _id: req.params.id },
            { name , code }
          );
          res.json({ result: typeclientUpdate });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      updateEtat: async (req, res) => {
        try {
          let findtypeclient = await TypeClientModels.findById({ _id: req.params.id });
          if (findtypeclient.etat === true) {
            await TypeClientModels.findByIdAndUpdate(
              { _id: req.params.id },
              { etat: false }
            );
            res.json({ result: "typeclient desactivé avec succès" });
          } else {
            await TypeClientModels.findByIdAndUpdate(
              { _id: req.params.id },
              { etat: true }
            );
            res.json({ result: "typeclient activé avec succès" });
          }
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
      SupprimeTypeClient: async (req, res) => {
        try {
          await TypeClientModels.findByIdAndDelete({ _id: req.params.id });
          res.json({ msg: "supprime avec succes" });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
 
}
module.exports=typeclientCtrl