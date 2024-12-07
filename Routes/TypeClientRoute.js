let router = require("express").Router();
let TypeClientCtrl = require("../controller/TypeClientCtrl");

router.get("/getalltypeclient", TypeClientCtrl.getAllTypeClient);
router.get("/typeclientbyid/:id", TypeClientCtrl.gettypeclientById);
router.post("/typeclient", TypeClientCtrl.AjouterTypeClient);
router.put("/typeclient/:id", TypeClientCtrl.ModifierTypeClient);
router.put("/etattypeclient/:id", TypeClientCtrl.updateEtat);
router.delete("/typeclient/:id", TypeClientCtrl.SupprimeTypeClient);

module.exports = router;
