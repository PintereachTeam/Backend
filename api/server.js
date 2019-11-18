const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const AuthRouter = require('../auth/auth-router.js');
const ArticlesRouter = require('../articles/articles-router.js');
const BoardsRouter = require('../boards/boards-router.js');
const UsersRouter = require('../users/users-router.js');

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/auth', AuthRouter);
server.use('/articles', ArticlesRouter);
server.use('/boards', BoardsRouter);
server.use('/users', UsersRouter);

server.get('/', (req, res) => {
    res.send({message: "we up"});
  });

module.exports = server;