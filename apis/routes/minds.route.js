const { Router } = require("express");

const auth = require("../middlewares/auth.middleware");
const mindCtrl = require("../controllers/minds.controller");

const router = Router();

router
    .route("/")
    .get(mindCtrl.getAllMinds)
    .post(mindCtrl.createMind);

router
    .route("/login")
    .post(mindCtrl.loginMind);

router
    .route("/mymind")
    .get(auth.protect, mindCtrl.myMind);

router
    .route("/:id")
    .get(mindCtrl.getMind)
    .patch(mindCtrl.updateMind)
    .delete(mindCtrl.deleteMind);

module.exports = router;