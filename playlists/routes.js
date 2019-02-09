const { Router } = require('express');

const Playlist = require('./model');
const Song = require('../songs/model');
const auth = require('../auth/middleware');

const router = new Router();

router.get('/playlists', auth, (req, res, next) => {
  Playlist.findAll()
    .then(playlists => {
      // TODO: check of this condition is required:
      if (!playlists || playlists.length === 0) {
        return res.status(404).send({
          message: `Playlists do not exist`
        });
      } else {
        return res.status(201).send(playlists);
      }
    })
    .catch(error => next(error));
});

router.get('/playlists/:id', auth, (req, res, next) => {
  Playlist.findByPk(req.params.id, { include: [Song] })
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        });
      } else {
        return res.status(201).send(playlist);
      }
    })
    .catch(error => next(error));
});

router.post('/playlists', auth, (req, res, next) => {
  Playlist.create(req.body)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        });
      }
      return res.status(201).send(playlist);
    })
    .catch(error => next(error));
});

router.delete('/playlists/:id', auth, (req, res, next) => {
  Playlist.findByPk(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        });
      }
      return playlist.destroy().then(() =>
        res.send({
          message: `Playlist was deleted`
        })
      );
    })
    .catch(error => next(error));
});

module.exports = router;
