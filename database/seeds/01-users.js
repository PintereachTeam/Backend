const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {username: 'DannyB', 
        password: bcrypt.hashSync("password", 10),
        first_name: "Daniel",
        last_name: "Briksza",
        email: "danny@fakeemail.com"},
        {username: 'mikey', 
        password: bcrypt.hashSync("fresh", 10),
        first_name: "Michael",
        last_name: "Harms",
        email: "mikey@fakeemail.com"},
        {username: 'kevin', 
        password: bcrypt.hashSync("glasses", 10),
        first_name: "Kevin",
        last_name: "Nguyen",
        email: "heavykevy@fakeemail.com"}
      ]);
    });
};