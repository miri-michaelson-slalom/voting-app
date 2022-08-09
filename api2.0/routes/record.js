const express = require('express');
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// Get all
recordRoutes.route('/games').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('games')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching games!');
      } else {
        res.json(result);
      }
    });
});


// Get one by Id
recordRoutes.route('/games/:game_id').get(async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('games')
    .find({ game_id: req.params.game_id })
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching game!');
      } else {
        res.json(result);
      }
    });
});

// Create one
recordRoutes.route('/games/addGame').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const gameDocument = {
    game_id: req.body.game_id,
    isOngoing: req.body.isOngoing,
  };

  dbConnect
    .collection('games')
    .insertOne(gameDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting game!');
      } else {
        console.log(`Added a new game with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

// Update one.
recordRoutes.route('/games/updateGame').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const gameQuery = { game_id: req.body.game_id };
  const isOngoing = {
    $set: {
      isOngoing: req.body.isOngoing
    }
  };

  dbConnect
    .collection('games')
    .updateOne(gameQuery, isOngoing, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error updating game with id ${gameQuery.game_id}!`);
      } else {
        console.log('1 game  updated');
      }
    });
});

// This section will help you delete a record.
// recordRoutes.route('/listings/delete/:id').delete((req, res) => {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { listing_id: req.body.id };

//   dbConnect
//     .collection('listingsAndReviews')
//     .deleteOne(listingQuery, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
//       } else {
//         console.log('1 document deleted');
//       }
//     });
// });

// Create collection.
recordRoutes.route('/create-collection').post(function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect.createCollection(`game-${req.body.game_id}`);
});

// Add vote one
recordRoutes.route('/register-vote').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const voteDocument = {
    userId: req.body.userId,
    // vote: req.body.vote,
  };

  dbConnect
    .collection(`game-${req.body.game_id}`)
    .insertOne(voteDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting game!');
      } else {
        console.log(`Added a new vote with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

// Get one by Id
recordRoutes.route('/:game_id/:user_id').get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection(`game-${req.params.game_id}`)
    .find({ userId: req.params.user_id })
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching game!');
      } else {
        res.json(result);
      }
    });
});


module.exports = recordRoutes;
