exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {username: 'DannyB', password: 'password'},
        {username: 'Mikey', password: 'fresh'},
        {username: 'kevin', password: 'glasses'}
      ]);
    });
};