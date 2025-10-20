import { useState } from "react";

export default function CreateYap({ onYapCreated }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("YAP cannot be empty!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/yaps", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to create YAP");
      }

      setContent("");
      setError("");

      if (onYapCreated) {
        onYapCreated();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-b border-gray-800 p-4 bg-gray-900">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's yapping?"
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
          rows={3}
          maxLength={300}
          disabled={loading}
        />
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-400">{content.length}/300</span>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
            disabled={!content.trim() || loading}
          >
            Post
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}
