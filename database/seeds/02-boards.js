exports.seed = function(knex, Promise) {
    return knex('boards').del()
      .then(function () {
        return knex('boards').insert([
          {board_title: 'Gene Editing', user_id: 1},
          {board_title: 'Chemistry', user_id: 2},
          {board_title: 'Cybercoins', user_id: 1},
          {board_title: 'Memetics', user_id: 3}
        ]);
      });
  };
  