import { useState, useEffect } from "react";
import { useAuth } from '../Context/AuthContext';   
import ProfileHeader from '../components/ProfileHeader';     
import EditProfileModal from '../components/EditProfileModal';   
import YapCard from '../components/YapCard';
      



export default function ProfilePage() {
    const{user:currentUser}=useAuth();
    const[profileUser,setProfileUser]=useState(null);
    const[userYaps,setUserYaps]=useState([]);
    const[isEditModalOpen,setIsEditModalOpen]=useState(false);
    const[loading,setLoading]=useState(true);


    const mockUser={
        id:1,
        name:"Test User",
        username:"testuser",
        email:"test@test.com",
        bio:"Test användare",
        location:"Stockholm, Sweden",
        website:"https://example.com",
        profileImage:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' fill='%236366f1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='60'%3E%3C/text%3E%3C/svg%3E",
        coverImage:"",
        joinDate:"2025-10-15",
        followers:120,
        following:80,
        yapCount: 34
    };
    const mockYaps = [
    {
      id: 1,
      text: "Jobbar på twitter-klonen! #coding",
      timeAgo: "2h",
      user: mockUser, 
      likes: 15,
      reyaps: 3, 
      replies: 7
    },
    {
      id: 2,
      text: "Kaffe nummer 46 idag... Har inte sovit på 52 timmar! ",
      timeAgo: "5h",
      user: mockUser,
      likes: 8,
      reyaps: 1,
      replies: 2
    },
    {
      id: 3,
      text: "Tailwind CSS är Tailwind inga kommentarer! ",
      timeAgo: "1d",
      user: mockUser,
      likes: 23,
      reyaps: 8,
      replies: 4

    }
  ];
  useEffect(()=>{
    
    
    // Simulera API-anrop med setTimeout
    setTimeout(()=>{
      
        
        setProfileUser(mockUser);
        setUserYaps(mockYaps);
        setLoading(false);
        
        
    },1000);

    /* RIKTIG API-KOD för senare:
    const fetchProfileData = async () => {
      try {
        // Hämta användardata
        const userResponse = await fetch(`/api/users/${userId}`);
        const userData = await userResponse.json();
        setProfileUser(userData);
        
        // Hämta användarens yaps
        const yapsResponse = await fetch(`/api/yaps/user/${userId}`);
        const yapsData = await yapsResponse.json();
        setUserYaps(yapsData);
        
      } catch (error) {
        console.error('Error loading profile:', error);
        // Hantera fel - visa felmeddelande
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
    */

    },[]);
    const handleEditProfile = () => {
        setIsEditModalOpen(true);
    };

    const handleSaveProfile = (updatedData) => {
        setProfileUser({...profileUser, ...updatedData});
    };

    const handleFollow = () => {
        // TODO: API integration
    };

    const handleUnFollow = () => {
        // TODO: API integration  
    };

    if(loading){
        return(
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Laddar profil...</p>
                </div>
            </div>
        )
    }

    const isOwnProfile=currentUser?.email===profileUser?.email;

    return (
        <div className="w-full bg-white min-h-screen">

        {/* Återanvänder ProfileHeader-komponenten
            Skickar all nödvändig data som props
            Separation of concerns - header-logik är isolerad */}

            <ProfileHeader
            user={profileUser}
            isOwnProfile={isOwnProfile}
            onEditProfile={handleEditProfile}
            onFollow={handleFollow}
            onUnFollow={handleUnFollow}
            />
            <div className="border-b border-gray-200">
                <nav className="flex">
                    <button className="px-6 py-4 text-blue-500 border-b-2 border-blue-500 font-semibold">
                        Yaps
                    </button>
                    <button className="px-6 py-4 text-gray-500 hover:text-gray-700 transition-colors">
                        Yaps & Svar  
                    </button>
                    <button className="px-6 py-4 text-gray-500 hover:text-gray-700 transition-colors">
                        Likes
                    </button>
                </nav>

            </div>
        
            <div>
                {userYaps.length>0 ? (
                    userYaps.map(yap=>(
                        <YapCard key={yap.id} yap={yap}/>
                    ))
                ):(
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-2">Inga yaps än</p>
                        <p className="text-gray-400">
                            {isOwnProfile
                            ? "Dags att börja yap:a!"
                            : "Den här användaren har inte yap:at än."
                            }
                        </p>
                    </div>
                )}
            </div>

            {isEditModalOpen && (
                <EditProfileModal
                    user={profileUser}
                    onSave={handleSaveProfile}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
}
 /*                   
PROFILEPAGE KOMPONENTER
 DATA MANAGEMENT:
   - AuthContext för inloggad användare
   - Lokal state för profildata och yaps
   - Mock data för utveckling

 LIFECYCLE:
   - useEffect för initial datahämtning
   - Loading states för bättre UX
   - Error handling (framtida implementering)

 COMPONENT COMPOSITION:
   - ProfileHeader för återanvändbar header
   - YapCard för återanvändbar yap-rendering
   - EditProfileModal för redigering

 USER INTERACTIONS:
    Redigera profil (egen profil)
   Följa/avfölja (andras profiler)
    Tab-navigation (framtida)

 RESPONSIVENESS:
    max-w-2xl för läsbarhet
    Flexibel layout som fungerar på mobil
            */
