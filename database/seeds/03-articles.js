exports.seed = function(knex, Promise) {
    return knex('articles').del()
      .then(function () {
        return knex('articles').insert([
          {url: "url 1", article_label: 'CRISPR babies are totally fine', board_id: 1,},
          {url: "url 2", article_label: 'Cooking with acids: Ceviche and Beyond', board_id: 2},
          {url: "url 3", article_label: `Maybe CRISPR babies aren't fine`, board_id: 1},
          {url: "url 4", article_label: `Bitcoin's fungibility problem: Zcash and Beyond the Infinite`, board_id: 3},
          {url: "url 5", article_label: `Virality, Humor, and Contrast`, board_id: 4}
        ]);
      });
  };
  