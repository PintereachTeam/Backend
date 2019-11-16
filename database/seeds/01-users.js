exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {username: 'DannyB', 
        password: 'password',
        first_name: "Daniel",
        last_name: "Briksza",
        email: "danny@fakeemail.com"},
        {username: 'mikey', 
        password: 'fresh',
        first_name: "Michael",
        last_name: "Harms",
        email: "mikey@fakeemail.com"},
        {username: 'kevin', 
        password: 'glasses',
        first_name: "Kevin",
        last_name: "Nguyen",
        email: "heavykevy@fakeemail.com"}
      ]);
    });
};