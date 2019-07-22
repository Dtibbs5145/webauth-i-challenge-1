const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const authenticate = require('./auth/authenticate-middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

module.exports = server;