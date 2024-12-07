const CementerieModels = require("../model/CementerieModels");


const CementerieCtrl={
    AjouterCementerie: async (req, res) => {
        try {
          let { name , code} = req.body;
          let Cementerie = await CementerieModels.findOne({ name });
          if (Cementerie) return res.status(400).json({ msg: "Cementerie deja existe" });
          let newCementerie = new CementerieModels({ name, code });
          newCementerie.save();
          res.json({ result: newCementerie });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      getAllCementerie: async (req, res) => {
        try {
          let Cementerie = await CementerieModels.find();
          return res.status(200).json(Cementerie);
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      getCementerieById: async (req, res) => {
        try {
          let id = req.params.id;
          let Cementerie = await CementerieModels.findById({ _id: id });
          if (!Cementerie) return res.status(400).json({ msg: "Cementerie n'existe pas" });
          res.json({ result: Cementerie });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
      ModifierCementerie: async (req, res) => {
        try {
          let { name, code } = req.body;
          let CementerieUpdate = await CementerieModels.findByIdAndUpdate(
            { _id: req.params.id },
            { name , code }
          );
          res.json({ result: CementerieUpdate });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      updateEtat: async (req, res) => {
        try {
          let findCementerie = await CementerieModels.findById({ _id: req.params.id });
          if (findCementerie.etat === true) {
            await CementerieModels.findByIdAndUpdate(
              { _id: req.params.id },
              { etat: false }
            );
            res.json({ result: "Cementerie desactivé avec succès" });
          } else {
            await CementerieModels.findByIdAndUpdate(
              { _id: req.params.id },
              { etat: true }
            );
            res.json({ result: "Cementerie activé avec succès" });
          }
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
      SupprimeCementerie: async (req, res) => {
        try {
          await CementerieModels.findByIdAndDelete({ _id: req.params.id });
          res.json({ msg: "supprime avec succes" });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
 
}
module.exports=CementerieCtrl