import { useState } from "react";
import { useTheme } from "../Context/ThemeContext";

export default function ProfileHeader({user, isOwnProfile, onEditProfile, onFollow, onUnFollow}) {
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
     <div className={`${
       isDark 
         ? 'bg-gray-900 text-white' 
         : 'bg-white text-gray-900'
     }`}>
       
       <div className={`h-48 relative overflow-hidden ${
         isDark 
           ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800' 
           : 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800'
       }`}>
         <div className={`absolute inset-0 ${
           isDark 
             ? 'bg-gradient-to-br from-blue-800/25 via-transparent to-slate-700/40' 
             : 'bg-gradient-to-br from-blue-400/20 via-transparent to-slate-700/40'
         }`}></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)]"></div>
         <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500/20 rounded-full"></div>
         <div className="absolute bottom-8 left-8 w-6 h-6 bg-slate-500/20 rounded-full"></div>
         {user.coverImage && (
           <img
             src={user.coverImage}
             alt="Cover"
             className="w-full h-full object-cover opacity-60 mix-blend-overlay"
           />
         )}
       </div>

       <div className="px-6 pb-6 relative">
         <div className="flex justify-between items-end -mt-16 mb-4">
           <div className="relative group">
             <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
             <img
               src={user.profileImage || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='60'%3E👤%3C/text%3E%3C/svg%3E"}
               alt={user.name}
               className={`relative w-32 h-32 rounded-full border-4 shadow-2xl object-cover group-hover:border-blue-500/50 transition-all duration-300 hover:scale-105 ${
                 isDark 
                   ? 'border-slate-600 bg-slate-600' 
                   : 'border-slate-300 bg-slate-300'
               }`}
               onError={(e) => {
                 e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='60'%3E${user.name?.charAt(0) || "U"}%3C/text%3E%3C/svg%3E`;
               }}
             />
           </div>

           <div className="mt-16">
             {isOwnProfile ? (
               <button
                 onClick={onEditProfile}
                 className="px-6 py-2 border border-slate-600 rounded-full font-semibold text-white hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-200 backdrop-blur-sm bg-black/20 relative group overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                 <span className="relative">Redigera profil</span>
               </button>
             ) : (
               <button
                 onClick={handleFollowClick}
                 className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 relative group overflow-hidden ${
                   isFollowing
                     ? 'bg-slate-800 text-white border border-slate-600 hover:bg-red-900/50 hover:border-red-500 hover:text-red-400'
                     : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg hover:shadow-blue-500/25 hover:scale-105'
                 }`}
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                 <span className="relative">{isFollowing ? 'Följer' : 'Följ'}</span>
               </button>
             )}
           </div>
         </div>

         <div className="mb-4">
           <h1 className={`text-2xl font-bold mb-1 hover:text-blue-500 transition-colors duration-200 ${
             isDark ? 'text-white' : 'text-gray-900'
           }`}>{user.name}</h1>
           <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>@{user.username || "username"}</p>
         </div>

         {user.bio && (
           <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{user.bio}</p>
         )}

         <div className="flex space-x-6 text-sm">
           <div className="group cursor-pointer">
             <span className={`font-bold group-hover:text-blue-400 transition-colors duration-200 ${
               isDark ? 'text-slate-100' : 'text-slate-200'
             }`}>{user.following || 0}</span>
             <span className={`ml-1 transition-colors duration-200 ${
               isDark 
                 ? 'text-slate-300 group-hover:text-slate-200' 
                 : 'text-slate-300 group-hover:text-slate-200'
             }`}>Följer</span>
           </div>
           <div className="group cursor-pointer">
             <span className={`font-bold group-hover:text-blue-400 transition-colors duration-200 ${
               isDark ? 'text-slate-100' : 'text-slate-200'
             }`}>{followersCount}</span>
             <span className={`ml-1 transition-colors duration-200 ${
               isDark 
                 ? 'text-slate-300 group-hover:text-slate-200' 
                 : 'text-slate-300 group-hover:text-slate-200'
             }`}>Följare</span>
           </div>
           <div className="group cursor-pointer">
             <span className={`font-bold group-hover:text-blue-400 transition-colors duration-200 ${
               isDark ? 'text-slate-100' : 'text-slate-200'
             }`}>{user.yapCount || 0}</span>
             <span className={`ml-1 transition-colors duration-200 ${
               isDark 
                 ? 'text-slate-300 group-hover:text-slate-200' 
                 : 'text-slate-300 group-hover:text-slate-200'
             }`}>Yaps</span>
           </div>
         </div>
       </div>
     </div>
   );
}