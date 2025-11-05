import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";


export default function ProfileHeader({ user, isOwnProfile, onEditProfile, onFollow, onUnFollow }) {
  if (!user) {
    return null;
  }

  const { isDark } = useTheme();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(user?.followers || 0);

  const handleFollowClick = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount(followersCount - 1);
      onUnFollow && onUnFollow(user.id);
    } else {
      setIsFollowing(true);
      setFollowersCount(followersCount + 1);
      onFollow && onFollow(user.id);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Gradient background */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-violet-500 to-blue-400 rounded-t-3xl z-0" />
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-violet-200 border-4 border-white shadow-lg flex items-center justify-center text-5xl font-bold text-violet-700 mt-10">
          {user?.name?.[0] || "A"}
        </div>
        {/* User info */}
        <div className="mt-4 text-center">
          <h2 className="text-3xl font-extrabold text-slate-800">{user?.name || "Användare"}</h2>
          <div className="text-slate-500 text-lg">@{user?.username || "anvandare"}</div>
          <div className="flex flex-wrap justify-center gap-2 text-slate-500 text-sm mt-1">
            <span>Gick med mars 2023</span>
            <span>• Stockholm, Sweden</span>
            <a href="#" className="text-blue-500 hover:underline">Webbsida</a>
          </div>
          <div className="mt-2 text-slate-700 text-base">
            {user?.bio || "Frontend Developer 🚀 • React Enthusiast • Coffee Addict ☕ • Building beautiful web experiences • Stockholm, Sweden"}
          </div>
        </div>
        {/* Statistik */}
        <div className="flex gap-6 mt-4 text-slate-700 text-base font-semibold">
          <span><span className="font-bold">324</span> Följer</span>
          <span><span className="font-bold">1.2K</span> Följare</span>
          <span><span className="font-bold">142</span> Yaps</span>
        </div>
        {/* Flikar */}
        <div className="flex gap-8 mt-6 border-b w-full justify-center">
          <button className="py-2 px-4 border-b-2 border-violet-500 font-bold text-violet-700">Yaps (142)</button>
          <button className="py-2 px-4 text-slate-500">Svar (12)</button>
          <button className="py-2 px-4 text-slate-500">Likes (89)</button>
          <button className="py-2 px-4 text-slate-500">Media (5)</button>
        </div>
      </div>
    </div>
  );
}