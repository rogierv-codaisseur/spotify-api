const { Router } = require('express');
const bcrypt = require('bcrypt');

const User = require('./model');
const { toJWT } = require('../auth/jwt');

const router = new Router();

router.post('/users', (req, res) => {
  const { email, password, password_confirmation } = req.body;
  if (password !== password_confirmation)
    return res.status(400).send({
      message: 'Passwords do not match.'
    });
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
      return User.create(user).then(
        res.send({ token: toJWT({ userId: user.id }) })
      );
    } else {
      return res.status(400).send({
        message: 'Please supply a valid email and password'
      });
    }
  });
});

module.exports = router;
