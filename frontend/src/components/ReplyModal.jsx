import { useState } from "react";

export default function ReplyModal({ yap, isOpen, onClose, onReplySubmit }) {
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      setError("Reply cannot be empty!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3000/yaps/${yap._id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: replyContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to post reply");
      }

      setReplyContent("");
      if (onReplySubmit) {
        onReplySubmit();
      }
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-50">
      <div className="w-full bg-slate-800 rounded-t-3xl border-t border-slate-700 shadow-2xl max-h-96 overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-200">Reply to Yap</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 p-1"
          >
            ✕
          </button>
        </div>

        {/* Original Yap Preview */}
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-750/50">
          <p className="text-slate-300 text-sm">{yap?.text || yap?.content}</p>
        </div>

        {/* Reply Form */}
        <div className="px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Reply to this Yap..."
              className="w-full text-base placeholder-slate-500 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none text-slate-200 py-2 px-3"
              rows={3}
              maxLength={300}
              disabled={loading}
            />

            {error && (
              <div className="text-sm text-red-300 bg-red-950/50 border border-red-800 rounded-lg p-2">
                {error}
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">
                {replyContent.length}/300
              </span>
              <button
                type="submit"
                disabled={!replyContent.trim() || loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold disabled:bg-slate-700 disabled:cursor-not-allowed"
              >
                {loading ? "Replying..." : "Reply"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}