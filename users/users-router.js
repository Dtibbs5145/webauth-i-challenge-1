const Users = require('./users-model');
const router = require('express').Router();


router.get('/ ')

router.get('/api/users', (req, res) => {

})

router.post('/api/register', (req, res) => {
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

router.post('/api/login', (req, res) => {

})

