let router = require("express").Router();
let VisitCtrl = require("../controller/visitCtrl")

router.post("/ajouter_visit", VisitCtrl.ajouterVisit)




module.exports = router;