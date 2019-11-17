const db = require('../database/db-config');

const getAll = _ => {
    return db('boards')
}


const getUserBoards = id => {
    return db('boards')
    .where({ user_id: id});
}

const findById = id => {
    return db('boards')
        .where({ id })
        .first();
}

const update = (id, edits) => {
    return db('boards')
    .where({id})
    .update(edits)
}

const insert = body => {
    return db('boards')
        .insert(body).returning("*")
        // .then(([id]) => findById(id));
};
  
const remove = id => {
    return db('boards')
        .where({ id })
        .del();
}

module.exports = {
    getUserBoards,
    getAll,
    findById,
    update,
    insert,
    remove
}

