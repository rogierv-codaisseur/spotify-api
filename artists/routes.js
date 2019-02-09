const { Router } = require('express');
const Sequelize = require('sequelize');

const Song = require('../songs/model');
const Playlist = require('../playlists/model');
const auth = require('../auth/middleware');

const router = new Router();

router.get('/artists', (req, res, next) => {
  Playlist.findAll({
    where: { userId: 3 },
    attributes: [],
    include: {
      model: Song,
      attributes: ['artist', 'title']
    }
  })
    .then(result => result[0].songs)
    .then(result => groupBy(result, 'artist'))
    .then(result => res.send(result));
});

function groupBy(objectArray, property) {
  return objectArray.reduce(function(acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj[property]);
    return acc;
  }, {});
}

module.exports = router;
