const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationsRun(){
  const schemas = [
  ].join('');

  sqliteConnection()
  .then(db =>  db.exec(schemas))
  .then(error => console.error(error));
}

module.exports = migrationsRun;