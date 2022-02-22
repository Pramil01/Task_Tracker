const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routers

const taskRouter = require("./routes/Tasks");
app.use("/tasks", taskRouter);

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
