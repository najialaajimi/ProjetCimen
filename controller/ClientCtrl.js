
const ClientModels = require("../model/clientModels");
const bcrypt = require("bcrypt");
const typeClientModels = require("../model/typeclientModels");
const CementeriesModels = require("../model/CementerieModels");
const TypeProduitsModels = require("../model/TypeProduitModels");
const jwt = require("jsonwebtoken");
const RoleModels = require("../model/RoleModels");

const ClientCtrl = {
  ajouterClient: async (req, res, next) => {
    try {
      const {
        firstname,
        lastname,
        email,
        phone,
        password,
        type_client,
        gouvernement,
        adress,
        delegation,
        cementerie,
        produit,
        prix,
      } = req.body;
  
      // Vérifier que tous les champs obligatoires sont remplis
      if (!firstname || !lastname || !email || !password || !type_client) {
        return res.status(400).json({ msg: "Tous les champs obligatoires doivent être remplis" });
      }
  
      // Vérifier si un client avec cet e-mail existe déjà
      const existingClient = await ClientModels.findOne({ email });
      if (existingClient) {
        return res.status(400).json({ msg: "Client avec cet e-mail existe déjà" });
      }
      // Rechercher le rôle par son libellé
      const findRole = await RoleModels.findOne({ name: "Client" });

      if (!findRole) {
        throw new Error("Rôle introuvable");
      }
  
      // Hacher le mot de passe
      const passwordHash = await bcrypt.hash(password, 10);
  
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
      const newClient = new ClientModels({
        firstname,
        lastname,
        email,
        phone,
        password: passwordHash,
        gouvernement,
        adress,
        delegation,
        type_client: findTypeClient._id,
        cementerie: cementeriesIds,
        produit: produitsIds,
        role: findRole._id,
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
  // Afficher tous les Clients
  getAllClient: async (req, res) => {
    try {
      const all_Client = await ClientModels.find().populate({
        path: "type_client",
      }).populate({
        path: "cementerie",
      }).populate({
        path: "produit",
      });

      return res.status(200).json({
        message: "Client successfully retrieved",
        data: all_Client,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  ModifierClient: async (req, res) => {
    try {
      const { firstname, lastname, email, phone, password } =
        req.body;

      const Client_Update = await ClientModels.findByIdAndUpdate(
        { _id: req.params.id },
        { firstname, lastname, email, phone, password }
      );
      return res.status(200).json({
        message: "Modifier Client avec succées",
        data: Client_Update,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getClientById: async (req, res) => {
    try {
      let id = req.params.id;
      let Client = await ClientModels.findById({ _id: id });
      if (!Client) return res.status(400).json({ msg: "Client n'existe pas" });
      res.json(Client);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //Etat role
  updateEtat_Client: async (req, res) => {
    try {
      const Etat_Client = await ClientModels.findById({ _id: req.params.id });
      if (Etat_Client.etatclient === true) {
        await ClientModels.findByIdAndUpdate(
          { _id: req.params.id },
          {
            etatclient: false,
          }
        );
        res.json({ result: "Client est desactivé avec succées" });
      } else {
        await ClientModels.findByIdAndUpdate(
          { _id: req.params.id },
          {
            etatclient: true,
          }
        );
        res.json({ result: "Client est activé avec succées" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  
  /* Login */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Rechercher l'utilisateur dans le modèle `Employee`
      let user = await ClientModels.findOne({ email });
  
      // Si l'utilisateur n'est pas trouvé dans `Employee`, rechercher dans le modèle `Client`
      if (!user) {
        user = await ClientModels.findOne({ email });
        if (!user) {
          return res.status(302).json({ msg: "email incorrect" });
        }
      }
  
      // Vérifier si le mot de passe correspond
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(302).json({ msg: "Mot de passe incorrect" });
      }
  
      // Générer un access token
      const accesstoken = createAccessToken({ id: user._id });
  
      // Vérifier le statut de l'utilisateur
      const isUserBlocked = user.etatclient ? !user.etatclient : "";
      if (isUserBlocked) {
        return res.status(302).json({ msg: "Vous êtes bloqué" });
      }
  
      // Retourner la réponse avec les informations de l'utilisateur et le token
      res.json({ ...user._doc, accesstoken });
  
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      let rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or register" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, client) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });
        let accesstoken = createAccessToken({ id: client.id });
        res.json({ accesstoken });
      });
      // res.json({rf_token})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/client/refresh_token" });
      return res.json({ msg: "logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

let createAccessToken = (client) => {
  return jwt.sign(client, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

let createRefreshToken = (client) => {
  return jwt.sign(client, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
module.exports = ClientCtrl;
