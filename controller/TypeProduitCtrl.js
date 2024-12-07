const TypeProduitModels = require("../model/TypeProduitModels");


const TypeProduitCtrl={
    AjouterTypeProduit: async (req, res) => {
        try {
          let { name } = req.body;
          let TypeProduit = await TypeProduitModels.findOne({ name });
          if (TypeProduit) return res.status(400).json({ msg: "Type Produit deja existe" });
          let newTypeProduit = new TypeProduitModels({ name });
          newTypeProduit.save();
          res.json({ result: newTypeProduit });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      getAllTypeProduit: async (req, res) => {
        try {
          let TypeProduit = await TypeProduitModels.find();
          return res.status(200).json(TypeProduit);
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      getTypeProduitById: async (req, res) => {
        try {
          let id = req.params.id;
          let TypeProduit = await TypeProduitModels.findById({ _id: id });
          if (!TypeProduit) return res.status(400).json({ msg: "Type Produit n'existe pas" });
          res.json({ result: TypeProduit });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
      ModifierTypeProduit: async (req, res) => {
        try {
          let { name } = req.body;
          let TypeProduitUpdate = await TypeProduitModels.findByIdAndUpdate(
            { _id: req.params.id },
            { name  }
          );
          res.json({ result: TypeProduitUpdate });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      updateEtat: async (req, res) => {
        try {
          let findTypeProduit = await TypeProduitModels.findById({ _id: req.params.id });
          if (findTypeProduit.etat === true) {
            await TypeProduitModels.findByIdAndUpdate(
              { _id: req.params.id },
              { etat: false }
            );
            res.json({ result: "Type Produit desactivé avec succès" });
          } else {
            await TypeProduitModels.findByIdAndUpdate(
              { _id: req.params.id },
              { etat: true }
            );
            res.json({ result: "Type Produit activé avec succès" });
          }
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
      SupprimeTypeProduit: async (req, res) => {
        try {
          await TypeProduitModels.findByIdAndDelete({ _id: req.params.id });
          res.json({ msg: "supprime avec succes" });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
 
}
module.exports=TypeProduitCtrl