import User from "../models/usersModel.js";

export const registerUser = async (req, res) => {
  const { name, faceDescriptor } = req.body; // Pastikan faceDescriptor disertakan dalam req.body

  // return res.status(201).json({ id: name });

  // Pastikan req.file tersedia sebelum mengakses path
  if (!req.file) {
    return res.status(400).json({ message: "No image file provided" });
  } 

  const image = req.file ? req.file.path : null;

  // return res.status(201).json({ id: image });

  try {
    const newUser = await User.create({ name, image, faceDescriptor });

    res.status(201).json({ id: newUser.id, name, });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
