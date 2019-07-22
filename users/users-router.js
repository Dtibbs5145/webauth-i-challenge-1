const Users = require('./users-model');
const router = require('express').Router();
const authenticate = require('../auth/authenticate-middleware');
const bcrypt = require('bcryptjs');

router.get('/users', authenticate, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
})

router.post('/register', (req, res) => {
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
                res.status(200).json({ message: 'Welcome, ${user.username}! You are logged in'});
            } else {
                res.status(401).json({ message: 'You shall not pass!'});
            }
        })
        .catch(error => {
          res.status(500).json(error);  
        });
});

module.exports = router;