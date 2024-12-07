const RoleModels = require("../model/RoleModels");


const RoleCtrl={
    AjouterRole: async (req, res) => {
        try {
          let { name } = req.body;
          let Role = await RoleModels.findOne({ name });
          if (Role) return res.status(400).json({ msg: "Role deja existe" });
          let newRole = new RoleModels({ name });
          newRole.save();
          res.json({ result: newRole });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      getAllRole: async (req, res) => {
        try {
          let Role = await RoleModels.find();
          return res.status(200).json(Role);
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      getRoleById: async (req, res) => {
        try {
          let id = req.params.id;
          let Role = await RoleModels.findById({ _id: id });
          if (!Role) return res.status(400).json({ msg: "Role n'existe pas" });
          res.json({ result: Role });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
      ModifierRole: async (req, res) => {
        try {
          let { name } = req.body;
          let RoleUpdate = await RoleModels.findByIdAndUpdate(
            { _id: req.params.id },
            { name  }
          );
          res.json({ result: RoleUpdate });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    
      updateEtat: async (req, res) => {
        try {
          let findRole = await RoleModels.findById({ _id: req.params.id });
          if (findRole.etat === true) {
            await RoleModels.findByIdAndUpdate(
              { _id: req.params.id },
              { etat: false }
            );
            res.json({ result: "Role desactivé avec succès" });
          } else {
            await RoleModels.findByIdAndUpdate(
              { _id: req.params.id },
              { etat: true }
            );
            res.json({ result: "Role activé avec succès" });
          }
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
      SupprimeRole: async (req, res) => {
        try {
          await RoleModels.findByIdAndDelete({ _id: req.params.id });
          res.json({ msg: "supprime avec succes" });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
 
}
module.exports=RoleCtrl