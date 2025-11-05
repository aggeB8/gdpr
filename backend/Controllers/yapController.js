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

export const LikeYap = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = "507f1f77bcf86cd799439011"; // FAKEID

    const yap = await Yap.findById(id);
    if (!yap) {
      return res.status(404).json({ message: "YAP not found" });
    }
    const hasLiked = yap.likes.includes(userId);
    if (hasLiked) {
      yap.likes = yap.likes.filter(like => like.toString() !== userId);
      yap.likesCount -= 1;
    } else {
      yap.likes.push(userId);
      yap.likesCount += 1;
    }
    await yap.save();
    res.status(200).json({
      message: hasLiked ? "Like removed" : "YAP liked",
      yap,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const ReplyYap = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = "507f1f77bcf86cd799439011"; // FAKEID

    const yap = await Yap.findById(id);
    if (!yap) {
      return res.status(404).json({ message: "YAP not found" });
    }

    yap.replies.push({
      author: userId,
      content,
      createdAt: new Date(),
    });
    yap.repliesCount += 1;

    await yap.save();
    res.status(200).json({
      message: "Reply added",
      yap,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
