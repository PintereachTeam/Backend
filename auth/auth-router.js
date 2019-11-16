const router = require('express').Router();
const bcrypt = require('bcryptjs');

const tokenService = require('./token-helper.js');
const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
console.log(req.body.username)
const {username, password} = req.body
    if(!username || !password) {
      res.status(422).json({message: 'Please provide a username and password'})
    } else {
      let user = req.body;
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
      Users.add(user)
        .then(saved => {
        res.status(201).json({message: `Welcome, ${req.body.username}!`});
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res.status(200).json({
          message: `Welcome, ${user.username}!`,
          token,
          id: user.id, 
        });
      } else {
        res.status(400).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(404).json({ message: 'The content you requested could not be found' });
    });
});

module.exports = router;
