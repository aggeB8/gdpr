import { useState } from "react"
import axiosClient from "../api/axiosClient"

export default function CreateYap({ onYapCreated }) {
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!content.trim()) {
            setError("Yap cannot be empty!")
            return
        }

        if (content.length > 300) {
            setError("Yap must be 300 characters or less!")
            return
        }

        setLoading(true)
        setError("")

        try {
            await axiosClient.post("/yaps", { content })

            setContent("")
            if (onYapCreated) {
                onYapCreated()
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="border-b border-slate-700 p-6 bg-slate-800">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        Y
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's yapping?"
                        className="flex-1 text-xl placeholder-slate-500 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-500 resize-none text-slate-200 py-2 px-4"
                        rows={3}
                        maxLength={300}
                        disabled={loading}
                    />
                </div>

                <div className="flex justify-between items-center pl-16">
                    <div className="text-sm text-slate-500">{content.length}/300</div>
                    <button
                        type="submit"
                        disabled={!content.trim() || loading}
                        className="px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold disabled:bg-slate-700 disabled:cursor-not-allowed"
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
                </div>

                {error && (
                    <div className="text-sm text-red-300 bg-red-950/50 border border-red-800 rounded-lg p-2">
                        {error}
                    </div>
                )}
            </form>
        </div>
    )
}
