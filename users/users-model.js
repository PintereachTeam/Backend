
const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

async function add(user) {
  return db('users').insert(user).returning("id","username", "first_name", "last_name", "email");

  
}
 
function find() {
  return db('users').select("id","username", "first_name", "last_name", "email");
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users')
    .select('id', 'username', 'first_name', 'last_name', 'email')
    .where({ id })
    .first();
}
