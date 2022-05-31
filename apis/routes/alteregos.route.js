const { Router } = require("express");

const router = Router();

const alterEgosCtrl = require("../controllers/alteregos.controller");

router
    .route("/")
    .get(alterEgosCtrl.getAllAlterEgos)
    .post(alterEgosCtrl.createNewAlterEgo);

router
    .route("/:id")
    .get(alterEgosCtrl.getAlterEgo)
    .patch(alterEgosCtrl.updateAlterEgo)
    .delete(alterEgosCtrl.deleteAlterEgo);

router
    .route("/minds/:idMind")
    .get(alterEgosCtrl.getAllAlterEgosByMind);

module.exports = router;