let router = require("express").Router();
let CementerieCtrl = require("../controller/CementerieCtrl");

router.get("/getallcementerie", CementerieCtrl.getAllCementerie);
router.get("/cementeriebyid/:id", CementerieCtrl.getCementerieById);
router.post("/cementerie", CementerieCtrl.AjouterCementerie);
router.put("/cementerie/:id", CementerieCtrl.ModifierCementerie);
router.put("/etatcementerie/:id", CementerieCtrl.updateEtat);
router.delete("/cementerie/:id", CementerieCtrl.SupprimeCementerie);

module.exports = router;
