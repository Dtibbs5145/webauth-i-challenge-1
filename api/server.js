const express = require('express');

const authRouter = require('../auth/auth-router');
const userRouter = require('../users/users-router');
const setupGlobalMiddleware = require('./setup-middleware');


const server = express();

setupGlobalMiddleware(server);

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.json({ api: 'up' });
});

module.exports = server;