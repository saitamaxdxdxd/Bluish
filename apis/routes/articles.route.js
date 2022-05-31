const { Router } = require("express");

const router = Router();

const themeCtrl = require("../controllers/articles.controller");

router
    .route("/")
    .get(themeCtrl.getAllArticles)
    .post(themeCtrl.createArticle);

router
    .route("/:id")
    .get(themeCtrl.getArticle)
    .patch(themeCtrl.updateArticle)
    .delete(themeCtrl.deleteArticle);

router
    .route("/theme/:idTheme")
    .get(themeCtrl.getAllArticlesByTheme);

router
    .route("/author/:idAuthor")
    .get(themeCtrl.getAllArticlesByAuthor);

module.exports = router;