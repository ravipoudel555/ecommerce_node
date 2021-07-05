const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        return res.send(409).json({
          meg: "email already exists",
        });
      } else {
        var newUser = User.build();
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.citizenshipNo = req.body.citizenshipNo;
        newUser
          .save()
          .then((savedUser) => {
            console.log("NewUser:", savedUser);
            return res.status(200).json({ savedUser });
          })
          .catch((err) => {
            console.log("Error:", err);
            return res.send({ error: err });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.send({ error: err });
    });
};

const login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          msg: "email doesn't exist",
        });
      } else {
        if (user.comparePassword(req.body.password)) {
          const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
            expiresIn: "1hr",
          });
          return res.status(200).json({ msg: "Auth successful", token });
        } else {
          return res.status(401).json({
            msg: "Auth failed: incorrect password",
          });
        }
      }
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(500).json({ error: err });
    });
};
module.exports = {
  signup,
  login,
};
