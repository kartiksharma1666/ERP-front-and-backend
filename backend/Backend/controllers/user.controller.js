const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data.' });
  }
};

exports.userBoard = (req, res) => {
  res.status(200).json({ content: 'User Content.' });
};

exports.adminBoard = (req, res) => {
  res.status(200).json({ content: 'Admin Content.' });
};

exports.moderatorBoard = (req, res) => {
  res.status(200).json({ content: 'Moderator Content.' });
};
exports.updateUserProfile = async (req, res) => {
  const userId = req.body._id; // Assuming you're sending user ID in the request body
  const updatedProfile = req.body;

  try {
      const user = await User.findOneAndUpdate(
          { _id: userId },
          updatedProfile,
          { new: true }
      );
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: 'Error updating user profile.' });
  }
};
