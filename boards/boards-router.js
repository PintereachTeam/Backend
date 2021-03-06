const router = require('express').Router();
const db = require('./boards-model.js');
const restricted = require('../auth/restricted-middleware.js');


router.get('/', restricted, (req,res) => {
  const id = req.params.id;
  db.getAll(id)
      .then(boards => {
          res.status(200).json(boards)

      })
      .catch(err => {
          res.status(500).json({error:'server error fetching all boards'})
      });
});


router.get('/:id', restricted, (req,res) => {
    const id = req.params.id;
    db.getUserBoards(id)
        .then(boards => {
            if (boards) {
            res.status(200).json(boards)
            } else {
                res.status(404).json({ message: 'user id not found'})
            }
        })
        .catch(err => {
            res.status(500).json({error:'server error finding board by user id'})
        });
});


router.put('/:id', restricted, (req, res) => {
  const id = req.params.id;
  const { board_title } = req.body;
  if (!board_title) {
    res.status(500).json({ message: 'Please provide a board title' });
  } else {
    db.update(id, { board_title })
      .then(board => {
        if (board) {
          res.status(200).json(board);
        } else {
          res.status(404).json({ message: 'No board with that ID was found' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

router.post('/', restricted, (req, res) => {
    const {user_id, board_title} = req.body;
    if (!user_id || !board_title ) {
        res.status(500).json({ message: 'please provide a userid and a board title' });
    } else{
        db.insert({ user_id, board_title})
            .then(board => {
                res.status(201).json(board[0]);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    }
  });

router.delete('/:id', restricted, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(board => {
            if(board) {
                res.status(200).json({message: 'board was deleted'});
            } else {
                res.status(404).json({ message: "board with that id doesn't exist"})
            }
        })
        .catch(err => {
            res.status(401).json({error:'insufficient credentials, please login again'})
        })
})


module.exports = router; 
