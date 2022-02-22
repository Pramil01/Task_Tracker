const express = require("express");
const router = express.Router();
const { Tasks } = require("../models");

router.get("/", async (req, res) => {
  const UserId = req.headers.userid;
  const listOfTasks = await Tasks.findAll({
    where:{
      UserId
    }
  });
  res.json(listOfTasks);
});

router.post("/", async (req, res) => {
  const task = req.body;
  if (!("text" in task)) {
    res.status(400).json({ msg: `No task present in the body object` });
  } else if (!("day" in task)) {
    res.status(400).json({ msg: `No day present in the body object` });
  } else if (!("reminder" in task)) {
    res.status(400).json({ msg: `No reminder present in the body object` });
  } else {
    const { id } = await Tasks.create(task);
    res.json({
      msg: "Task added succesfully",
      id,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: "Incorrect id" });
  const response = await Tasks.destroy({
    where: { id },
  });
  if (!response) {
    res.status(404).send({ error: `No tasks with id ${id} present` });
  } else {
    res.status(204).send();
  }
});

module.exports = router;
