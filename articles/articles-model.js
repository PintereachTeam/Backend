const db = require('../database/db-config');


const getAll = async res => {
    return db('articles');
};

const update = (id, edits) => {
    return db('articles')
    .where({id})
    .update(edits)
}

function getByBoard (id){
    return db('articles').where({ board_id: id })
}

const findById = id => {
    return db('articles')
        .where({ id })
        .first();
}

const insert = body => {
    return db('articles')
        .insert(body)
        .then(([id]) => findById(id));
};
  
const remove = id => {
    return db('articles')
        .where({ id })
        .del();
}

module.exports = {
    getAll,
    getByBoard,
    findById,
    update,
    insert,
    remove
}

