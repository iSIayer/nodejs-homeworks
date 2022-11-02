const { User } = require("../../models");
const fs = require("fs/promises");
const path = require("path");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalName } = req.file;
  try {
    const resultUpload = path.join(__dirname, "../../", "avatars");
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", originalName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};
module.exports = updateAvatar;
