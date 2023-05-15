const { Router } = require("express");

const Movie_NotesController = require("../controllers/Movie_NotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movie_notesRoutes = Router();

const movie_notesController = new Movie_NotesController();

movie_notesRoutes.use(ensureAuthenticated);

movie_notesRoutes.post("/", movie_notesController.create);
movie_notesRoutes.get("/", movie_notesController.index);
movie_notesRoutes.get("/:id", movie_notesController.show);
movie_notesRoutes.delete("/:id", movie_notesController.delete);
//movie_notesRoutes.put("/:id", movie_notesController.update);
  

module.exports = movie_notesRoutes;