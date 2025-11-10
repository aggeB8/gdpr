import { populate } from "dotenv"
import User from "../Models/user.js"
import Yap from "../Models/yap.js"

// DATA ACCESS REQUEST (Article 15)
export const getDataAccess = async (req, res) => {
    console.log(req.params.id)

    try {
        const userId = req.params.id
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const yaps = await Yap.find({ author: userId })

        //console.log(await Yap.find().populate("author"))

        const likedYaps = await Yap.find({ likes: userId }).select("_id content")

        const allYaps = await Yap.find({})
        const userReplies = []
        allYaps.forEach((yap) => {
            yap.replies.forEach((reply) => {
                if (reply.author.toString() === userId) {
                    userReplies.push({
                        yapId: yap._id,
                        content: reply.content,
                        createdAt: reply.createdAt
                    })
                }
            })
        })

        const userData = {
            requestDate: new Date().toISOString(),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                createdAt: user.createdAt
            },
            yaps: yaps.map((yap) => ({
                id: yap._id,
                content: yap.content,
                likes: yap.likesCount,
                replies: yap.repliesCount,
                createdAt: yap.createdAt
            })),
            likes: likedYaps.map((yap) => ({ yapId: yap._id })),
            replies: userReplies,
            statistics: {
                totalYaps: yaps.length,
                totalLikes: likedYaps.length,
                totalReplies: userReplies.length
            }
        }

        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// DATA DELETION REQUEST (Article 17)
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        await Yap.deleteMany({ author: userId })
        await Yap.updateMany(
            { likes: userId },
            { $pull: { likes: userId }, $inc: { likesCount: -1 } }
        )

        const allYaps = await Yap.find({})
        for (const yap of allYaps) {
            const updatedReplies = yap.replies.filter(
                (reply) => reply.author.toString() !== userId
            )
            yap.replies = updatedReplies
            yap.repliesCount = updatedReplies.length
            await yap.save()
        }

        await User.findByIdAndDelete(userId)

        res.status(200).json({
            message: "Account and all data permanently deleted",
            deletedAt: new Date().toISOString()
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// DATA PORTABILITY (Article 20)
export const exportData = async (req, res) => {
    try {
        const userId = req.params.id
        const format = req.query.format || "json"

        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const yaps = await Yap.find({ author: userId })
        const exportData = {
            exportDate: new Date().toISOString(),
            user: { id: user._id, name: user.name, email: user.email },
            yaps: yaps
        }

        if (format === "csv") {
            let csvContent = "Data Export\n\n"
            csvContent += `User: ${user.name} (${user.email})\n`
            csvContent += `Yaps: ${yaps.length}\n\n`
            res.setHeader("Content-Type", "text/csv")
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="data-${userId}.csv"`
            )
            res.send(csvContent)
        } else {
            res.setHeader("Content-Type", "application/json")
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="data-${userId}.json"`
            )
            res.json(exportData)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
