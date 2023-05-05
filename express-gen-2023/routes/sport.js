const router = require("express").Router();
const axios = require("axios");
const cors = require("cors");
router.use(cors());

router.get("/", async function (req, res, next) {
  let remote = "206.167.123.9";

  let url = `https://maps.ottawa.ca/arcgis/rest/services/OfficialPlan/MapServer/132/query?outFields=*&where=1%3D1&f=geojson`;

  let fetch = await axios.get(url);

  let datas = fetch.data.features;
  let outData = [];

  let outDataCount = datas.length > 50 ? 50 : datas.length;

  for (let i = 0; i < outDataCount; i++) {
    {
      datas[i].properties = {
        category: datas[i].properties.SUB_CATEGORY,
        name: datas[i].properties.NAME,
        address: datas[i].properties.ADDRESS,
        phone: datas[i].properties.PHONE,
        website: datas[i].properties.WEBSITE,
        lat: datas[i].geometry.coordinates[1],
        lng: datas[i].geometry.coordinates[0],
      };
      outData.push(datas[i].properties);
    }
  }
  res.json(outData);
});

module.exports = router;
