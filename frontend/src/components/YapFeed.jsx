import { useState, useEffect } from "react";
import YapCard from "./YapCard";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../Context/AuthContext";

export default function YapFeed() {
  const [yaps, setYaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchYaps();
  }, []);

  const fetchYaps = async () => {
    try {
      const response = await fetch("http://localhost:3000/yaps");
      const data = await response.json();
      setYaps(data);
    } catch (error) {
      console.error("Error fetching yaps:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (yapId) => {
    setYaps(yaps.filter((yap) => yap._id !== yapId));
  };

  if (loading) {
    return <div className="p-4 text-slate-400">Loading...</div>;
  }

  if (yaps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-2xl font-bold text-slate-300 mb-2">
          No Yaps Yet
        </h3>
        <p className="text-slate-400">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <>
      {yaps.map((yap) => (
        <YapCard
          key={yap._id}
          yap={{
            ...yap,
            text: yap.content,
            timeAgo: formatDistanceToNow(new Date(yap.createdAt), {
              addSuffix: true,
            }),
            user: { 
              name: user?.name || "Anonymous", 
              username: user?.email?.split('@')[0] || "anon" 
            },
            replies: yap.repliesCount || 0,
          }}
          onDelete={handleDelete}
          onReplyClick={() => setReplyingTo(yap._id)}
        />
      ))}
    </>
  );
}
