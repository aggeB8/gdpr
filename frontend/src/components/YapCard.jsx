import { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import ReplyModal from "./ReplyModal";

export default function YapCard({ yap, onDelete, onReplyClick }) {
  const { isDark } = useTheme();
  const [likes, setLikes] = useState(yap.likesCount || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:3000/yaps/${yap._id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "507f1f77bcf86cd799439011" }), // FAKEID för nu
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
      }
    } catch (error) {
      console.error("Error liking yap:", error);
    }
  };

  return (
    <div
      className="border-b border-slate-700 p-4 transition-all duration-200 relative hover:bg-slate-700/50 group"
    >
      <button
        onClick={() => onDelete(yap._id)}
        className="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-500/10"
        aria-label="Delete YAP"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex space-x-3">
        <div className="relative">
          <img
            src={
              yap.user?.profileImage ||
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23374151"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16"%3E👤%3C/text%3E%3C/svg%3E'
            }
            alt={yap.user?.name}
            className={`w-10 h-10 rounded-full hover:scale-105 transition-transform duration-200 ring-1 hover:ring-blue-500/50 ${
              isDark ? "ring-slate-600" : "ring-slate-400"
            }`}
          />
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span
              className={`font-semibold hover:text-slate-300 transition-colors duration-200 cursor-pointer text-slate-200`}
            >
              {yap.user?.name}
            </span>
            <span className="text-sm text-slate-500">
              @{yap.user?.username}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-sm text-slate-500">
              {yap.timeAgo}
            </span>
          </div>

          <p className="leading-relaxed mb-3 text-slate-300">
            {yap.text}
          </p>

          <div className="flex items-center justify-between max-w-md text-slate-500">
            <button
              onClick={() => setIsReplyModalOpen(true)}
              className="flex items-center space-x-2 hover:text-blue-400 transition-all duration-200 p-2 rounded-full hover:bg-blue-500/10 group/btn"
            >
              <div className="relative">
                <svg
                  className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">{yap.replies || 0}</span>
            </button>

            <button
              className="flex items-center space-x-2 hover:text-green-400 transition-all duration-200 p-2 rounded-full hover:bg-green-500/10 group/btn"
            >
              <div className="relative">
                <svg
                  className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">{yap.reyaps || 0}</span>
            </button>

            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'hover:text-red-400'}`}
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span>{likes}</span>
            </button>

            <button className="flex items-center space-x-2 hover:text-blue-400 transition-all duration-200 p-2 rounded-full hover:bg-blue-500/10 group/btn">
              <div className="relative">
                <svg
                  className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Reply Modal */}
      <ReplyModal 
        yap={yap}
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        onReplySubmit={onReplyClick}
      />
    </div>
  );
}

/*
YapCard KOMPONENTENS 

1. DISPLAY: Visa yap-innehåll på ett läsbart sätt
2. USER INFO: Visa vem som skrev yapet och när
3. INTERACTIONS: Visa räknare för likes/replies/reyaps  
4. ACTIONS: Tillhandahåll knappar för användarinteraktioner
5. LAYOUT: Håll konsistent design med andra yap-cards


- REUSABILITY: Kan användas i feeds, profiler, sökresultat
- CONSISTENCY: Samma layout oavsett var den används
- PERFORMANCE: Lättviktig komponent utan onödig komplexitet
- ACCESSIBILITY: Semantiska HTML-element och hover-states
- EXTENSIBILITY: Lätt att lägga till fler funktioner senare

*/
