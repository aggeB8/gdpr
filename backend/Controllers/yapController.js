import Yap from "../Models/yap.js";

// Skapa YAP.
export const createYap = async (req, res) => {
  try {
    const { content } = req.body;

    const newYap = await Yap.create({
      content,
      author: "507f1f77bcf86cd799439011", // FAKEID
    });

    res.status(201).json(newYap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
