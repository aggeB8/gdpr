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

// Hämta YAP´s.
export const getYaps = async (req, res) => {
  try {
    const yaps = await Yap.find()
      // .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(yaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ta bort YAP
export const deleteYap = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedYap = await Yap.findByIdAndDelete(id);

    if (!deletedYap) {
      return res.status(404).json({ message: "YAP not found" });
    }

    res.status(200).json({ message: "YAP deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
