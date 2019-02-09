const { Router } = require('express');

const Song = require('../songs/model');
const Playlist = require('../playlists/model');
const auth = require('../auth/middleware');

const router = new Router();

router.get('/artists', auth, (req, res) => {
  Playlist.findAll({
    where: { userId: req.user.id },
    include: [Song]
  })
    .then(result => {
      if (!result) return res.status(404).send({ message: 'No artists found' });
      return result[0].songs;
    })
    .then(result => groupBy(result, 'artist', 'title'))
    .then(result => res.status(200).send(result));
});

function groupBy(objectArray, property, value) {
  return objectArray.reduce(function(acc, obj) {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj[value]);
    return acc;
  }, {});
}

module.exports = router;
