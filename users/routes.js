const { Router } = require('express');
const bcrypt = require('bcrypt');

const User = require('./model');
const { toJWT } = require('../auth/jwt');

const router = new Router();

router.post('/users', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then(entity => {
    if (entity) {
      return res
        .status(400)
        .send({ message: 'User with that email already exists.' });
    }
    if (email && password) {
      const user = {
        email,
        password: bcrypt.hashSync(password, 10)
      };
      User.create(user).then(res.send({ token: toJWT({ userId: user.id }) }));
    } else {
      res.status(400).send({
        message: 'Please supply a valid email and password'
      });
    }
  });
});

module.exports = router;
