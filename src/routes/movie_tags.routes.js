const { Router } = require("express");

const Movie_TagsController = require("../controllers/Movie_TagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movie_tagsRoutes = Router();

const movie_tagsController = new Movie_TagsController();

movie_tagsRoutes.use(ensureAuthenticated);

movie_tagsRoutes.get("/", movie_tagsController.index);
  

module.exports = movie_tagsRoutes;