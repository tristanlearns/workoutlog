const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { LogModel, UserModel } = require("../models");

router.post("/create", validateJWT, async (req, res) => {
  const { description, definition, result } = req.body.log;
  const { owner_id } = req.user;
  console.log(req.user);
  const logEntry = {
    description,
    definition,
    result,
    owner_id: owner_id,
  };
  try {
    const newLog = await LogModel.create(logEntry);
    res.status(200).json(newLog);
  } catch (error) {
    res.status(500).json({ error: error });
  }
  LogModel.create(logEntry);
});

router.get("/", async (req, res) => {
  try {
    const entries = await LogModel.findAll();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/about", (req, res) => {
  res.send(`hi`);
});

module.exports = router;
