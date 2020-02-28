const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Place   = require('../models/Place').Place;

/**
 * Functionality for this route:
 *  C   POST    /Places/        Create a new Place
 *  R   GET     /Places         Gets an array of all Places
 *  R   GET     /Places/:id     Get a single Place, by ID
 *  U   PUT     /Places/:id     Update a single Place, by id
 *  D   DELETE  /Places/:id     Delete a single Place, by ID
 */

// GET an array of all Places change
router.get('/', (req, res) => {
    return mongoose
      .model('Place')
      .find({})
      .then (Places => res.json(Places))
      .catch(err => res
        .status(500)
        .json({ok: false})
      );
  });

  // GET a single Place by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('Place')
    .findOne({_id: req.params.id})
    .then (Place => res.json(Place))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new Place
router.post('/', (req, res) => {
  return new Place({
    title     : req.body.title,
    country   : req.body.country,
    description : req.body.description,
  })
  .save()
  .then (Place => Place.populate(Place, {path: '_id,country,description'}))
  .then (Place => res.json(Place))
  .catch(err => res
    .status(400)
    .json({ok: false, error: err.message})
  );
});

// DELETE Delete a topic with a given ID
router.delete('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Place
    .deleteOne({_id: req.params.id})
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PUT Update a Place
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Place
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
        title  : req.body.title,
      }},
      {new: true}
    )
    .then (Place => Place.populate(Place, {path: '_id'}))
    .then (Place => res.json(Place))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

  module.exports = router;