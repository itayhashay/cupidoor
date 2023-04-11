const router = require("express").Router();
const match = require("./model/match");
const landlords = require("./mock/landlords.json");
router.post("/match", (req, res, next) => {
  const { answers, priority } = req.body;
  let matchPercentage = [];
  for (let landlord of landlords.landlords) {
    const landlordData = {
      name: landlord.name,
      address: landlord.address,
      floor: landlord.floor,
      price: landlord.price,
      parkings: landlord.parkings,
      rooms: landlord.rooms,
    };
    matchPercentage.push({
      ...landlordData,
      match: match({ answers, priority }, landlord),
    });
  }

  matchPercentage = matchPercentage.sort((a, b) => {
    return a.match > b.match ? -1 : 1;
  });
  res.send(matchPercentage);
});

module.exports = router;
