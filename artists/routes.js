const { Router } = require('express');
const Sequelize = require('sequelize');

const Song = require('../songs/model');
const Playlist = require('../playlists/model');
const auth = require('../auth/middleware');

const router = new Router();

// GET /artists: A user should be able to retrieve a list of artists, with all their songs (from the different playlists)

router.get('/artists', (req, res, next) => {
  Song.findAll({
    attributes: [
      Sequelize.fn('DISTINCT', Sequelize.col('artist')),
      'artist',
      'title'
    ],
    order: ['artist']
  }).then(artist => res.send(artist));
});

module.exports = router;
