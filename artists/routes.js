const { Router } = require('express');
const Sequelize = require('sequelize');

const Song = require('../songs/model');
const Playlist = require('../playlists/model');
const auth = require('../auth/middleware');

const router = new Router();

// GET /artists: A user should be able to retrieve a list of artists, with all their songs (from the different playlists)

// router.get('/artists', (req, res, next) => {
//   Song.findAll({
//     attributes: [
//       'artist',
//       [Sequelize.fn('Count', 'title'), 'titleCount'],
//       'title'
//     ],
//     group: ['artist']
//   }).then(artist => res.send(artist));
// });

// router.get('/artists', (req, res, next) => {
//   Song.findAll({ where: { playlistId: 2 } })
//     .then(playlist => Playlist.findAll({ where: { id: playlist.playlistId } }))
//     .then(result => res.send(result));
// });

module.exports = router;
