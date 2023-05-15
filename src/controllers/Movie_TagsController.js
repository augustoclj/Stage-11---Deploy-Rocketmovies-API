const knex = require("../database/knex");


class Movie_TagsController{

  async index(request, response){
    const user_id  = request.user.id;
    //console.log(user_id);
    
    const tags = await knex("movie_tags")
    .where({ user_id })

    return response.json(tags);
  }

}

module.exports = Movie_TagsController