exports.seed = function(knex, Promise) {
    return knex('articles').del()
      .then(function () {
        return knex('articles').insert([
          {url: "https://fakeurl.fakeurl.com/fakearticle.pdf", article_label: 'CRISPR babies are totally fine', board_id: 1,},
          {url: "https://fakeurl1.fakeurl1.com/fakearticle.pdf", article_label: 'Cooking with acids: Ceviche and Beyond', board_id: 2},
          {url: "https://fakeurl2.fakeurl2.com/fakearticle.pdf", article_label: `Maybe CRISPR babies aren't fine`, board_id: 1},
          {url: "https://fakeurl3.fakeurl3.com/fakearticle.pdf", article_label: `Bitcoin's fungibility problem: Zcash and Beyond the Infinite`, board_id: 3},
          {url: "https://fakeurl4.fakeurl4.com/fakearticle.pdf", article_label: `Virality, Humor, and Contrast`, board_id: 4}
        ]);
      });
  };
  