let router = require("express").Router();
let RoleCtrl = require("../controller/RolesCtrl");

router.get("/getallrole", RoleCtrl.getAllRole);
router.get("/rolebyid/:id", RoleCtrl.getRoleById);
router.post("/role", RoleCtrl.AjouterRole);
router.put("/role/:id", RoleCtrl.ModifierRole);
router.put("/etatrole/:id", RoleCtrl.updateEtat);
router.delete("/role/:id", RoleCtrl.SupprimeRole);

module.exports = router;
