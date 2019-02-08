const { Router } = require('express');

const Playlist = require('./model');

const router = new Router();

router.get('/playlists', (req, res, next) => {
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

router.get('/playlists/:id', (req, res, next) => {
  Playlist.findByPk(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exists`
        });
      } else {
        return res.status(201).send(playlist);
      }
    })
    .catch(error => next(error));
});

module.exports = router;
