const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user
    .save()
    .then((user) => {
      if (req.body.roles) {
        Role.find({
          name: { $in: req.body.roles },
        })
          .then((roles) => {
            console.log(roles);

            user.roles = roles.map((role) => role._id);
            user
              .save()
              .then(() => {
                res.send({
                  status: "success",
                  message: "User was registered successfully!",
                });
              })
              .catch((err) => {
                res.status(500).json({ status: "failed", message: err });
              });
          })
          .catch((err) =>
            res.status(500).json({ status: "failed", message: err })
          );
      } else {
        Role.findOne({ name: "user" })
          .then((role) => {
            user.roles = [role._id];
            user
              .save()
              .then(() =>
                res.json({
                  status: "success",
                  message: "User was registered successfully!",
                })
              )
              .catch((err) => {
                res.status(500).json({ status: "failed", message: err });
              });
          })
          .catch((err) =>
            res.status(500).json({ status: "failed", message: err })
          );
      }
    })
    .catch((err) => res.status(500).json({ status: "failed", message: err }));
};

exports.signin = (req, res) => {
  // const {username,password} = req.body;

  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec()
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ status: "failed", message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          status: "failed",
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      //creation of tokens
      const token = jwt.sign(
        { id: user.id, username: req.body.username },
        config.secret,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        }
      );

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        status: "success",
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    })
    .catch((err) => res.status(500).send({ status: "failed", message: err }));
};
