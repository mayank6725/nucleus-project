//user
//restaurant
//people-bifurcate
//time
//duration
const express = require('express');
const router = new express.Router();
const Table = require('../models/Table_reserve');
const User = require('../models/Users');
const Restaurant = require('../models/Table_reserve');

router.get('/tablereserve', async (req, res) => {
  try {
    var user = await User.findOne({
      uid: req.uid
    });
    var reserve = await Table.findOne({
      user_id: user._id
    });
    if (!reserve) {
      throw new Error("No tables reserved yet")
    }
    return res.send(reserve);
  } catch (e) {
    res.send({
      e
    });
  }
});

router.post('/tablereserve', async (req, res) => {
  try {
    var user = await User.findOne({
      uid: req.uid
    });
    var restaurant = await Restaurant.findOne({
      name: req.body.restaurant_name
    });
    var reserve = new Table(req.body);
    reserve[user_id] = user._id;
    reserve[restaurant_id] = restaurant._id;
    await reserve.save();
    res.send(reserve);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/tablereserve', async (req, res) => {
  try {
    var user = await User.findOne({
      uid: req.uid
    });
    var reserve = Table.findOneAndDelete({
      user_id: user._id
    });
    res.send(reserve);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;