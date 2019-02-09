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

// router.get('/artists', (req, res, next) => {
//   Song.findAll({
//     group: ['artist'],
//     attributes: [Sequelize.fn('COUNT', Sequelize.col('artist')), 'artist']
//   }).then(result => res.send(result));
// });

// router.get('/artists', (req, res, next) => {
//   Song.findAll({ where: { playlistId: 1 } })
//     .then(playlist => Playlist.findAll({ where: { id: playlist.playlistId } }))
//     .then(result => res.send(result));
// });

// router.get('/artists', (req, res, next) => {
//   Playlist.findAll({
//     include: [Song],
//     where: { userId: 1 }
//   }).then(playlists => {
//     return res.send({ playlists });
//   });
// });

module.exports = router;
