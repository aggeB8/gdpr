import { useState, useEffect } from "react";
import YapCard from "./YapCard";
import { formatDistanceToNow } from "date-fns";

export default function YapFeed() {
  const [yaps, setYaps] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchYaps();
  }, []);

  const fetchYaps = async () => {
    try {
      const response = await fetch("http://localhost:3000/yaps");

      if (!response.ok) {
        throw new Error("Failed to fetch YAPs");
      }

      const data = await response.json();
      setYaps(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = (yapId) => {
    setYaps(yaps.filter((yap) => yap._id !== yapId));
  };

  return (
    <>
      {yaps.map((yap) => (
        <YapCard
          key={yap._id}
          yap={{
            id: yap._id,
            text: yap.content,
            user: { name: "Anonymonus", username: "Anon" },
            timeAgo: formatDistanceToNow(new Date(yap.createdAt), {
              addSuffix: true,
            }),
            likes: 0,
            replies: 0,
            reyaps: 0,
            onDelete: handleDelete,
          }}
        />
      ))}
    </>
  );
}
