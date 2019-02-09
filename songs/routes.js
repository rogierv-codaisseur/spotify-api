const { Router } = require('express');

const Song = require('./model');
const Playlist = require('../playlists/model');

const router = new Router();

router.post('/playlists/:id/songs', (req, res, next) => {
  const playlistId = req.params.id;
  Playlist.findByPk(playlistId)
    .then(playlist => {
      if (!playlist)
        return res.status(404).send({
          message: 'Playlist does not exist'
        });
      return Song.create({ ...req.body, playlistId })
        .then(song => {
          if (!song) {
            return res.status(404).send({
              message: `Song does not exist`
            });
          }
          return res.status(201).send(song);
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

module.exports = router;