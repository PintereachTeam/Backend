
exports.up = function(knex) {
    return knex.schema
      .createTable('users', users => {
        users.increments();
        users.string('username', 128)
          .notNullable()
          .unique();
        users.string('password', 128).notNullable();
        users.string('first_name', 128)
        users.string('last_name', 128)
        users.string('email', 128) 
      })
      .createTable('boards', boards => {
        boards.increments();
        boards.string('board_title', 255)
          .notNullable()
        boards.integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
        })
  
      .createTable('articles', articles => {
        articles.increments(); 
        articles.string('url', 512)
          .notNullable() 
        articles.string('article_label', 255)
        articles.integer('board_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('boards')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('users')
      .dropTableIfExists('boards')
      .dropTableIfExists('articles');
  };