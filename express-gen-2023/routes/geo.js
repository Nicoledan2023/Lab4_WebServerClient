const router = require("express").Router();
const axios = require("axios");
const cors = require("cors");
router.use(cors());

// const page = require('../model/page');
//https://api.ipgeolocation.io/ipgeo?apiKey=3fd5e9586dc143fea6e30d1d1c286f29
//req.socket.remoteAddress
router.get("/", async function (req, res, next) {
  let remote = "206.167.123.9";

  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=3fd5e9586dc143fea6e30d1d1c286f29&ip=${remote}`;

  let fetch = await axios.get(url);

  let lat = fetch.data.latitude;
  let lng = fetch.data.longitude;

  // console.log(fetch.data);
  res.json({ lat: lat, lng: lng });
});

module.exports = router;
