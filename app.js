const express = require("express");
const { sequelize } = require("./models");
const logger = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));
//database connection check
const port = process.env.PORT || 3000;
sequelize
  .authenticate()
  .then(() => {
    console.log("database connected");
    app.listen(port, () => {
      console.log(`server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//passport initialization

app.use("/users", require("./routes/userRoute"));
