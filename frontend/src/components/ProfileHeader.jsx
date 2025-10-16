import { useState } from "react";

export default function ProfileHeader({user, isOwnProfile, onEditProfile, onFollow, onUnFollow}) {
   if (!user) {
     return null;
   }
   
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
     <div className="bg-white border-b border-gray-200">
       <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
         <img
           src={user.coverImage || "/default-cover.jpg"}
           alt="Cover"
           className="w-full h-full object-cover"
         />
       </div>

       <div className="px-6 pb-6">
         <div className="flex justify-between items-end -mt-16 mb-4">
           <div className="relative">
             <img
               src={user.profileImage || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' fill='%236366f1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='60'%3E👤%3C/text%3E%3C/svg%3E"}
               alt={user.name}
               className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg object-cover"
               onError={(e) => {
                 e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' fill='%236366f1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='60'%3E${user.name?.charAt(0) || "U"}%3C/text%3E%3C/svg%3E`;
               }}
             />
           </div>

           <div className="mt-16">
             {isOwnProfile ? (
               <button
                 onClick={onEditProfile}
                 className="px-6 py-2 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors"
               >
                 Redigera profil
               </button>
             ) : (
               <button
                 onClick={handleFollowClick}
                 className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                   isFollowing
                     ? 'bg-gray-200 text-gray-800 hover:bg-red-100 hover:text-red-600'
                     : 'bg-blue-500 text-white hover:bg-blue-600'
                 }`}
               >
                 {isFollowing ? 'Följer' : 'Följ'}
               </button>
             )}
           </div>
         </div>

         <div className="mb-4">
           <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
           <p className="text-gray-600">@{user.username || "username"}</p>
         </div>

         {user.bio && (
           <p className="text-gray-800 mb-4 leading-relaxed">{user.bio}</p>
         )}

         <div className="flex space-x-6 text-sm">
           <div>
             <span className="font-bold text-gray-900">{user.following || 0}</span>
             <span className="text-gray-600 ml-1">Följer</span>
           </div>
           <div>
             <span className="font-bold text-gray-900">{followersCount}</span>
             <span className="text-gray-600 ml-1">Följare</span>
           </div>
           <div>
             <span className="font-bold text-gray-900">{user.yapCount || 0}</span>
             <span className="text-gray-600 ml-1">Yaps</span>
           </div>
         </div>
       </div>
     </div>
   );
}