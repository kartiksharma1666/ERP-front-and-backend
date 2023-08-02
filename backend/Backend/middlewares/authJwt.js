const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ status: "failed", message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: "failed",
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      Role.find({
        _id: { $in: user.roles },
      })
        .then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }

          res
            .status(403)
            .send({ status: "failed", message: "Require Admin Role!" });
          return;
        })
        .catch((err) =>
          res.status(500).send({ status: "failed", message: err })
        );
    })
    .catch((err) => res.status(500).send({ status: "failed", message: err }));
};

isModerator = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      Role.find({
        _id: { $in: user.roles },
      })
        .then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }

          res
            .status(403)
            .send({ status: "failed", message: "Require Moderator Role!" });
          return;
        })
        .catch((err) =>
          res.status(500).send({ status: "failed", message: err })
        );
    })
    .catch((err) => res.status(500).send({ status: "failed", message: err }));
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
