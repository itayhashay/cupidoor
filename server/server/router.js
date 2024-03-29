const router = require("express").Router();
const match = require("./model/match");
const landlords = require("./mock/landlords.json");
const verifyToken = require("./middlewares/verifyToken");

router.use("/user",[verifyToken], require("./controller/user.controller"));
router.use("/apartment", [verifyToken],require("./controller/apartment.controller"));
router.use("/question",[verifyToken], require("./controller/question.controller"));
router.use("/score", require("./controller/score.controller"));
router.use("/user-answer",[verifyToken], require("./controller/usersAnswer.controller"));
router.use("/users-relations",[verifyToken], require("./controller/usersRelations.controller"));
router.use("/", require("./routes/auth.routes"));
router.use("/chat",[verifyToken], require("./routes/chat.routes"));

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
