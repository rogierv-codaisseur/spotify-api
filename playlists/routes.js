const { Router } = require('express');

const Playlist = require('./model');

const router = new Router();

router.get('/playlists', (req, res, next) => {
  Playlist.findAll()
    .then(playlists => res.status(201).send(playlists))
    .catch(error => next(error));
});

module.exports = router;
