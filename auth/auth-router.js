const router = require('express').Router();
const bcrypt = require('bcryptjs');
const authenticate = require('./authenticate-middleware');
const Users = require('../users/users-model');

router.get('/users', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
})

router.post('/register', authenticate, (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 14)
    user.password = hash;
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.username = user.username;
                res.status(200).json({ message: `Welcome, ${user.username}! You are logged in`});
            } else {
                res.status(401).json({ message: 'You shall not pass!'});
            }
        })
        .catch(error => {
          res.status(500).json(error);  
        });
});

module.exports = router;