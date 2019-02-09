const { Router } = require('express');
const bcrypt = require('bcrypt');

const User = require('../users/model');
const { toJWT } = require('./jwt');
const auth = require('./middleware');

const router = new Router();

router.post('/tokens', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    User.findOne({ where: { email } })
      .then(entity => {
        if (!entity) {
          return res
            .status(400)
            .send({ message: 'User with that email does not exists' });
        }
        if (bcrypt.compareSync(password, entity.password)) {
          res.send({ token: toJWT({ userId: entity.id }) });
        } else {
          res.status(400).send({ message: 'Password was incorrect' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Something went wrong' });
      });
  } else {
    res.status(401).send({
      message: 'Please supply a valid email and password'
    });
  }
});

router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint. ${req.user.id}`
  });
});

module.exports = router;
