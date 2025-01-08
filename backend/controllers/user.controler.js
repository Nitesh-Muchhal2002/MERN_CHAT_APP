import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    //find all users
    // const filteredUsers = await User.find({_id:loggedInUserId}).select("-password"); //shows all users
  
    //shows all users but not shows current loggedUser
     const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
     
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
