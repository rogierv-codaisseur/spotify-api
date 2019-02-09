const express = require('express');
const bodyParser = require('body-parser');

const playlistsRouter = require('./playlists/routes');
const songsRouter = require('./songs/routes');
const usersRouter = require('./users/routes');
const authRouter = require('./auth/routes');
const artistsRouter = require('./artists/routes');

const app = express();
const port = process.env.PORT || 4000;

app
  .use(bodyParser.json())
  .use(songsRouter)
  .use(playlistsRouter)
  .use(usersRouter)
  .use(authRouter)
  .use(artistsRouter)
  .listen(port, () => console.log(`Listening on port ${port}`));
