const router = require('express').Router();
const db = require('./articles-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req,res) => {
    db.getAll()
        .then(articles => {
            res.json(articles);
        })
        .catch(err => res.send(err));
});

router.get('/:id', restricted, (req,res) => {
    const id = req.params.id;
    db.getByBoard(id)
        .then(articles => {
            if (articles) {
            res.status(200).json(articles)
            } else {
                res.status(404).json({ message: 'board with that id not found'})
            }
        })
        .catch(err => {
            res.status(500).json({error:'server error getting articles'})
        });
});

router.put('/:id', restricted, (req, res) => {
    const id = req.params.id;
    const { article_label, url } = req.body;
    if (!url) {
      res.status(500).json({ message: 'Missing URL field' });
    } else {
      db.update(id, { article_label, url })
        .then(article => {
          if (article) {
            res.status(200).json(article);
          } else {
            res.status(404).json({ message: 'ID not found' });
          }
        })
        .catch(err => {
          res.status(500).json(err);
        });
    }
  });

router.post('/', restricted, (req, res) => {
    const {board_id, article_label, url} = req.body;
    if (!board_id || !url ) {
        res.status(500).json({ message: 'Please provide a url and board_id' });
    } else{
        db.insert({ board_id, article_label, url})
            .then(article => {
                res.status(201).json(article[0]);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    }
  });

router.delete('/:id', restricted, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(article => {
            if(article) {
                res.status(200).json({message: 'article was deleted'});
            } else {
                res.status(404).json({ message: "article with that id doesn't exist"})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


module.exports = router; 