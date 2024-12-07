let router = require("express").Router();
let clientCtrl = require("../controller/ClientCtrl")

router.post("/ajouter_client", clientCtrl.ajouterClient)
router.post("/login", clientCtrl.login)
router.get("/logout", clientCtrl.logout)
router.get("/getallclient", clientCtrl.getAllClient)
router.get("/getclient/:id", clientCtrl.getClientById)
router.put("/modifier_client/:id", clientCtrl.ModifierClient)
router.put("/update_etat_client/:id", clientCtrl.updateEtat_Client)
router.get('/client/refresh_token',clientCtrl.refreshToken)




module.exports = router;