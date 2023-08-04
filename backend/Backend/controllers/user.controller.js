exports.allAccess = (req, res) => {
  res.status(200).json({ content: "All access Content." });
};

exports.userBoard = (req, res) => {
  res.status(200).json({ content: "Admin Content." });
};

exports.adminBoard = (req, res) => {
  res.status(200).json({ content: "admin Content." });
};

exports.moderatorBoard = (req, res) => {
  res.status(200).json({ content: "moderator Content." });
};
