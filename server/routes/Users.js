const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then(async (hash) => {
    const { id } = await Users.create({
      username,
      password: hash,
    });
    const accessToken = sign({ username, id }, "importantSecret");
    res.json({ msg: "User added successfully", token: accessToken, id });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username } });
  if (!user) res.status(403).json({ msg: "user not found" });
  else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.status(401).json({ msg: "wrong username or password" });
      else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          "importantSecret"
        );
        res.json({ token: accessToken, id: user.id });
      }
    });
  }
});

module.exports = router;
