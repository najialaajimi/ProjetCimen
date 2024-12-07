const VisitModel = require("../model/VisiteModel")
const typeClientModels = require("../model/typeclientModels");
const CementeriesModels = require("../model/CementerieModels");
const TypeProduitsModels = require("../model/TypeProduitModels");

const VisitCtrl = {
    ajouterVisit: async (req, res, next) => {
        try {
          const {
            date,
            responsable,
            type_client,
            observation,
            reclamation,
            cementerie,
            produit,
            prix,
          } = req.body;
      
          // Vérifier l'existence du type de client
          const findTypeClient = await typeClientModels.findById(type_client);
          if (!findTypeClient) {
            return res.status(400).json({ msg: "Type Client introuvable" });
          }
      
          // Vérifier l'existence des cimenteries
          let cementeriesIds = [];
          if (cementerie && cementerie.length > 0) {
            const foundCementeries = await CementeriesModels.find({ _id: { $in: cementerie } });
            if (foundCementeries.length !== cementerie.length) {
              return res.status(400).json({ msg: "Une ou plusieurs cimenteries sont introuvables" });
            }
            cementeriesIds = foundCementeries.map((c) => c._id);
          }
      
          // Vérifier l'existence des produits
          let produitsIds = [];
          if (produit && produit.length > 0) {
            const foundProduits = await TypeProduitsModels.find({ _id: { $in: produit } });
            if (foundProduits.length !== produit.length) {
              return res.status(400).json({ msg: "Un ou plusieurs produits sont introuvables" });
            }
            produitsIds = foundProduits.map((p) => p._id);
          }
      
          // Créer un nouveau client
          const newClient = new VisitModel({
            date,
            responsable,
            observation,
            reclamation,
            type_client: findTypeClient._id,
            cementerie: cementeriesIds,
            produit: produitsIds,
            prix: prix || [],
          });
      
          // Sauvegarder le client dans la base de données
          await newClient.save();
      
          return res.status(200).json({
            message: "Client ajouté avec succès",
            result: newClient,
          });
        } catch (error) {
          console.error("Erreur lors de l'ajout du client", error);
          next(error);
        }
      },
}

module.exports = VisitCtrl