import React from "react";

const trending = [
  { tag: "#React", count: "46K", trend: "↑" },
  { tag: "#WebDev", count: "16K", trend: "↑" },
  { tag: "#JavaScript", count: "56K", trend: "↑" },
  { tag: "#TypeScript", count: "37K", trend: "→" },
  { tag: "#CSS", count: "22K", trend: "↑" },
];

export default function TrendingList() {
  return (
    <div className="space-y-2">
      {trending.map((item, index) => (
        <div
          key={item.tag}
          className="hover:bg-slate-700/50 p-3 rounded-lg transition-all duration-200 cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">
                  Trending #{index + 1}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-bold text-slate-300 ${
                  index === 0 ? 'bg-blue-900/40' : 
                  index === 1 ? 'bg-purple-900/40' : 
                  index === 2 ? 'bg-teal-900/40' :
                  index === 3 ? 'bg-orange-900/40' : 'bg-slate-700/40'
                }`}>
                  {item.trend}
                </span>
              </div>
              <p className={`font-bold group-hover:text-slate-100 transition-colors mt-1 ${
                index === 0 ? 'text-blue-300' : 
                index === 1 ? 'text-purple-300' : 
                index === 2 ? 'text-teal-300' :
                index === 3 ? 'text-orange-300' : 'text-slate-200'
              }`}>
                {item.tag}
              </p>
              <p className="text-sm text-slate-500">{item.count} posts</p>
            </div>
            <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
              🔥
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}