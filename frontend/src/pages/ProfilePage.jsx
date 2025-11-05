import React from "react";
import ProfileHeader from '../components/ProfileHeader';
import TrendingList from '../components/TrendingList';

// Demo user
const demoUser = {
  name: "Ilya Fredriksson",
  username: "ilya_dev",
  bio: "Web Developer 🚀 • React and BJJ nerd on fulltime • Coffee & Code • Building amazing applications • Stockholm, Sweden",
};

const userYaps = [
  {
    id: 1,
    text: "Debugging production code at 3 AM is basically like rolling with a 10x black belt - you're gonna get submitted either way  #webdev #BJJ",
    likes: 234,
    replies: 45,
    retweets: 89,
    time: "2h",
  },
  {
    id: 2,
    text: "CSS is harder than a rear naked choke. Both will strangle your will to live but one at least makes sense in a gi 😂 #Frontend",
    likes: 412,
    replies: 102,
    retweets: 156,
    time: "4h",
  },
  {
    id: 3,
    text: "Just realized my code review feedback was more brutal than my last sparring session. Same energy: 'This needs work' 🤝",
    likes: 187,
    replies: 58,
    retweets: 72,
    time: "6h",
  },
  {
    id: 4,
    text: "React state management is like escaping mount position - one wrong move and you're stuck in an infinite loop forever 💯",
    likes: 298,
    replies: 73,
    retweets: 94,
    time: "8h",
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto py-8 px-4">
        
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-teal-600/30 rounded-3xl shadow-xl mb-0 relative overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 -mt-24 relative z-10">
          
          {/* Left - Profile Info */}
          <div className="flex-1">
            {/* Profile Card */}
            <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8 mb-6">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-teal-600 flex items-center justify-center text-5xl font-bold text-white shadow-2xl border-4 border-slate-800 hover:shadow-3xl transition-all">
                    IF
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="mb-6">
                    <h1 className="text-4xl font-bold text-slate-100 mb-2">{demoUser.name}</h1>
                    <p className="text-xl text-slate-400">@{demoUser.username}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-300 text-base mb-8 leading-relaxed max-w-2xl">{demoUser.bio}</p>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl border border-blue-500 hover:border-blue-400">
                      ✎ Edit Profile
                    </button>
                    <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl border border-slate-600 hover:border-slate-500">
                      ⚙️ Settings
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-700">
                <div className="text-center group">
                  <div className="text-3xl font-bold text-blue-300 group-hover:text-blue-200 transition-colors">324</div>
                  <div className="text-sm text-slate-400 mt-2">Following</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-purple-300 group-hover:text-purple-200 transition-colors">1.2K</div>
                  <div className="text-sm text-slate-400 mt-2">Followers</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-teal-300 group-hover:text-teal-200 transition-colors">142</div>
                  <div className="text-sm text-slate-400 mt-2">Yaps</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
              <div className="flex border-b border-slate-700">
                <button className="flex-1 py-4 px-6 font-semibold text-slate-200 hover:text-blue-300 transition-colors border-b-2 border-blue-500 bg-slate-800/50">
                  📝 Yaps
                </button>
                <button className="flex-1 py-4 px-6 font-semibold text-slate-500 hover:text-purple-300 transition-colors border-b-2 border-transparent hover:border-purple-500/50">
                  💬 Replies
                </button>
                <button className="flex-1 py-4 px-6 font-semibold text-slate-500 hover:text-teal-300 transition-colors border-b-2 border-transparent hover:border-teal-500/50">
                  ❤️ Likes
                </button>
                <button className="flex-1 py-4 px-6 font-semibold text-slate-500 hover:text-orange-300 transition-colors border-b-2 border-transparent hover:border-orange-500/50">
                  🖼️ Media
                </button>
              </div>

              {/* Yaps Feed */}
              <div className="divide-y divide-slate-700">
                {userYaps.map((yap) => (
                  <div
                    key={yap.id}
                    className="p-6 hover:bg-slate-700/30 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                        {demoUser.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-slate-100 group-hover:text-blue-300 transition-colors">{demoUser.name}</span>
                          <span className="text-slate-500">@{demoUser.username}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-500">{yap.time}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{yap.text}</p>
                      </div>
                    </div>

                    {/* Engagement */}
                    <div className="flex gap-8 ml-16 text-slate-500 text-sm">
                      <button className="flex items-center gap-2 hover:text-blue-400 transition-colors hover:bg-blue-950/40 px-3 py-2 rounded-full">
                        💬 {yap.replies}
                      </button>
                      <button className="flex items-center gap-2 hover:text-teal-400 transition-colors hover:bg-teal-950/40 px-3 py-2 rounded-full">
                        🔁 {yap.retweets}
                      </button>
                      <button className="flex items-center gap-2 hover:text-red-400 transition-colors hover:bg-red-950/40 px-3 py-2 rounded-full">
                        ❤️ {yap.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Sidebar */}
          <div className="w-full lg:w-80">
            <div className="space-y-6">
              {/* Trending */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden sticky top-20">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-700">
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <span>🔥</span> Trending
                  </h3>
                </div>
                <div className="p-6">
                  <TrendingList />
                </div>
              </div>

              {/* About */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-750 rounded-2xl border border-slate-700 shadow-xl p-6">
                <h3 className="font-bold text-slate-100 mb-4 text-lg">ℹ️ About</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-slate-400">📅 Joined</div>
                    <div className="text-slate-200 font-semibold">January 2024</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">🎯 Last Active</div>
                    <div className="text-slate-200 font-semibold">Just now</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">⭐ Engagement</div>
                    <div className="text-blue-300 font-semibold">Excellent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
