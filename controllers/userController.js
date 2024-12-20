import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if(users.length > 0){
        return res.status(200).json(users);
    }
    return res.status(404).json({message : 'No user found'})
  } catch (error) {
    return res.status(500).json({ message: "Internal server error 🔴" });
  }
  
}

export const createUser = async (req, res) => {
    let { email, name, last_name, password } = req.body;
      try {
        const user = await new User({
            email,
            name,
            last_name,
            password,
          } = req.body);
        await user.save();
        return res.status(201).json(user);
      } catch (error) {
        return res.status(500).json({ message: "Internal server error 🔴" });
      }
};

export const getUserById = async (req, res) => {
   const { id } = req.params;
    try {
      const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(updateUser);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error 🔴" });
    }
}

export const updateUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(req.body);
    // Mise à jour de l'utilisateur avec les données envoyées
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    // Vérification si l'utilisateur existe
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser); // Renvoie l'utilisateur mis à jour
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error 🔴' });
  }
};

export const deleteUserByID = async (req, res) => {
    const { id } = req.params;
      try {
        const deleteUser = await User.deleteOne({ _id: id });
        if(deleteUser.deletedCount === 1){
            return res.status(200 ).json({message : 'User has been deleted'})
        }
        return res.status(400).json({message : 'User not found'})
      } catch (error) {
        return res.status(500).json({ message: "Internal server error 🔴" });
      }
}
