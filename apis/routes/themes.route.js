const { Router } = require("express");

const router = Router();

const themeCtrl = require("../controllers/themes.controller");

router
    .route("/")
    .get(themeCtrl.getAllThemes)
    .post(themeCtrl.createTheme);

router
    .route("/:id")
    .get(themeCtrl.getTheme)
    .patch(themeCtrl.updateTheme)
    .delete(themeCtrl.deleteTheme);

router
    .route("/theme/:idTheme")
    .get(themeCtrl.getAllThemesByTheme);

module.exports = router;