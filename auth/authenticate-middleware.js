const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

module.exports = authenticate;

function authenticate(req, res, next) {
    const { username, password } = req.headers;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                Users.find()
                    .then(users => {
                        res.json(users);
                    })
                    .catch(err => res.send(err));
            } else {
                res.status(401).json({ message: 'You shall not pass!!' })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
}