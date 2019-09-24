'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

const googleApps = require('./playstore.js');

app.use(express);

app.get('./apps', (req, res) => {
  const sort = req.query.sort;
  const genres = req.query.genres;
  const genreArr = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of rating or app.');
    }
  }

  if (genres) {
    if (!genreArr.includes(sort)) {
      return res
        .status(400)
        .send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card.');
    }
  }

  let results = googleApps
    .filter(googleApp =>
      googleApp
        .App
        .Rating
        .Genre
    );

  if (sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log('Server has started.');
});