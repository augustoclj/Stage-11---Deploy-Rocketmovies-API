const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError")

class UsersController {
/**
 * index - GET para listar vários registros.
 * show - GET para exibir um registro expecifico
 * create - POST para criar um registro
 * update - PUT para atualizar um registro
 * delete - DELETE para remover um registro
 */

  async create(request, response){
    const {name, email, password} = request.body

    const checkUserExists = await knex("users").where("email", email).first();

    if(checkUserExists){
      throw new AppError("Este e-mail já está em uso.")
    }
   
    const hashedPassword = await hash(password, 8);

    await knex('users').insert({
      name: `${name}`,
      email: `${email}`,
      password: `${hashedPassword}`
    });

    return response.status(201).json();
  }

  async update(request, response){
    const {name, email, password, old_password} = request.body;
    const user_id = request.user.id;

    // const database = await sqliteConnection();
    const user = await knex("users").where("id", user_id).first();

    if(!user){
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await knex("users").where("email", email).first();

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if( password && !old_password){
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
    }

    if( password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere.")
      }

      user.password = await hash(password,8);
    }

    await knex("users")
    .update({
      name: `${user.name}`, 
      email: `${user.email}`, 
      password: `${user.password}`, 
      updated_at: knex.fn.now()
    })
    .where("id", user_id);

    return response.status(200).json();
  }
}

module.exports = UsersController;