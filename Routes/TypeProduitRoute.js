let router = require("express").Router();
let TypeProduitCtrl = require("../controller/TypeProduitCtrl");

router.get("/getalltypeproduit", TypeProduitCtrl.getAllTypeProduit);
router.get("/typeproduitbyid/:id", TypeProduitCtrl.getTypeProduitById);
router.post("/typeproduit", TypeProduitCtrl.AjouterTypeProduit);
router.put("/typeproduit/:id", TypeProduitCtrl.ModifierTypeProduit);
router.put("/etattypeproduit/:id", TypeProduitCtrl.updateEtat);
router.delete("/typeproduit/:id", TypeProduitCtrl.SupprimeTypeProduit);

module.exports = router;
