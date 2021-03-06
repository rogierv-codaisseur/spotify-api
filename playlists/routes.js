const { Router } = require('express');

const Playlist = require('./model');
const Song = require('../songs/model');
const auth = require('../auth/middleware');

const router = new Router();

router.get('/playlists', auth, (req, res, next) => {
  Playlist.findAll({ where: { userId: req.user.id } })
    .then(playlists => {
      if (!playlists || playlists.length === 0)
        return res.status(404).send({
          message: 'Playlists do not exist'
        });
      return res.status(200).send({ playlists });
    })
    .catch(error => next(error));
});

router.get('/playlists/:id', auth, (req, res, next) => {
  Playlist.findByPk(req.params.id, { include: [Song] })
    .then(playlist => {
      if (!playlist || playlist.userId !== req.user.id)
        return res.status(404).send({
          message: 'Playlist does not exist'
        });
      return res.status(200).send(playlist);
    })
    .catch(error => next(error));
});

router.post('/playlists', auth, (req, res, next) => {
  Playlist.create({ ...req.body, userId: req.user.id })
    .then(playlist => {
      if (!playlist)
        return res.status(404).send({
          message: `Playlist does not exist`
        });
      return res.status(201).send(playlist);
    })
    .catch(error => next(error));
});

router.delete('/playlists/:id', auth, (req, res, next) => {
  Playlist.findByPk(req.params.id)
    .then(playlist => {
      if (!playlist || playlist.userId !== req.user.id)
        return res.status(404).send({
          message: 'Playlist does not exist'
        });
      return playlist.destroy().then(() =>
        res.status(204).send({
          message: 'Playlist was deleted'
        })
      );
    })
    .catch(error => next(error));
});

module.exports = router;
