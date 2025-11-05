import CreateYap from "../components/CreateYap";
import YapFeed from "../components/YapFeed";
import TrendingList from "../components/TrendingList";
import { useEffect, useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleYapCreated = () => {
    setRefresh((prev) => prev + 1);
  };

  if (showHero) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
              Welcome to Yap
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-600 to-cyan-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-2xl text-gray-700 font-light max-w-md">
            Where voices converge and ideas spark
          </p>
          <div className="flex justify-center space-x-3 mt-12">
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
            <div className="w-3 h-3 bg-cyan-600 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto py-8 px-4">
        
        {/* Main Feed */}
        <div className="flex-1 lg:max-w-3xl">
          {/* Sticky Header */}
          
          {/* Create Yap Section */}
          <div className="bg-slate-800 rounded-2xl shadow-md border border-slate-700 mb-4 overflow-hidden hover:shadow-lg hover:border-slate-600 transition-all">
            <CreateYap onYapCreated={handleYapCreated} />
          </div>

          {/* Yap Feed */}
          <div className="bg-slate-800 rounded-2xl shadow-md border border-slate-700 overflow-hidden hover:border-slate-600 transition-all">
            <YapFeed key={refresh} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <div className="sticky top-20 space-y-4">
            {/* Trending Section */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-md overflow-hidden hover:border-slate-600 transition-all">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-700">
                <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                  <span>🔥</span>
                  <span>What's Trending</span>
                </h3>
              </div>
              <div className="p-6">
                <TrendingList />
              </div>
            </div>

            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-750 rounded-2xl border border-blue-800/30 shadow-md p-6 relative overflow-hidden hover:border-blue-700/50 transition-all">
              <div className="absolute top-0 right-0 text-6xl opacity-5 transform translate-x-1/4 -translate-y-1/4">
                💬
              </div>
              <h3 className="font-bold text-blue-300 mb-2 text-lg relative z-10">👋 Welcome to Yap</h3>
              <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                Share your thoughts, connect with others, and be part of an amazing community!
              </p>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-750 rounded-2xl border border-teal-800/30 shadow-md p-6 hover:border-teal-700/50 transition-all">
              <h3 className="font-bold text-teal-300 mb-3 text-lg flex items-center gap-2">
                <span>💡</span> Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex gap-2">
                  <span className="text-teal-400">✓</span>
                  <span>Use #hashtags to reach more people</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-400">✓</span>
                  <span>Engage with trending topics</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-400">✓</span>
                  <span>Be respectful and authentic</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
