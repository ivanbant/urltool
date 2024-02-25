const updateUserTier = async (userId) => {
  const { tier } = req.body;
  const user = req.user;
  if (user) {
    user.tier = tier;
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      tier: updatedUser.tier,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export default updateUserTier;
