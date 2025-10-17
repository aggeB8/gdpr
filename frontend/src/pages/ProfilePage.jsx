import { useState, useEffect } from "react";
import { useAuth } from '../Context/AuthContext';   
import { useTheme } from '../Context/ThemeContext';
import ProfileHeader from '../components/ProfileHeader';     
import EditProfileModal from '../components/EditProfileModal';   
import YapCard from '../components/YapCard';
import ThemeToggle from '../components/ThemeToggle';
      



export default function ProfilePage() {
    const{user:currentUser}=useAuth();
    const { isDark } = useTheme();
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
            <div className={`flex items-center justify-center min-h-screen ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
               
                <div className={`fixed inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50'}`}></div>
                <div className="relative z-10 text-center">
                    <div className="animate-pulse mb-6">
                        <div className="relative">
                            <div className={`animate-spin rounded-full h-12 w-12 border-2 ${isDark ? 'border-slate-600' : 'border-slate-300'}`}></div>
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 absolute top-0 left-0" style={{animationDuration: '0.8s'}}></div>
                        </div>
                    </div>
                    <p className={`text-sm animate-pulse ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Laddar profil...</p>
                    
                   
                    <div className="fixed inset-0 opacity-30 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse-slow"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-slate-500/10 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                    </div>
                </div>
            </div>
        )
    }

    const isOwnProfile=currentUser?.email===profileUser?.email;

    return (
        <div className={`w-full min-h-screen ${
            isDark 
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-900'
        }`}>
            
            
            <div className="fixed top-20 right-4 z-40">
                <ThemeToggle />
            </div>
            
            <div className={`w-full min-h-screen ${
                isDark 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-white text-gray-900'
            }`}>
                
                <div className={`border-b ${
                    isDark 
                        ? 'bg-gray-900 border-gray-700' 
                        : 'bg-white border-gray-200'
                }`}>
                    <ProfileHeader
                        user={profileUser}
                        isOwnProfile={isOwnProfile}
                        onEditProfile={handleEditProfile}
                        onFollow={handleFollow}
                        onUnFollow={handleUnFollow}
                    />
                </div>

                
                <div className={`border-b sticky top-0 z-20 ${
                    isDark 
                        ? 'bg-gray-900 border-gray-700' 
                        : 'bg-white border-gray-200'
                }`}>
                    <nav className="flex">
                        <button className={`flex-1 px-6 py-4 border-b-2 border-blue-400 font-semibold text-sm transition-all duration-200 relative group ${
                            isDark 
                                ? 'text-blue-400 hover:bg-slate-600/40' 
                                : 'text-blue-600 hover:bg-slate-200/40'
                        }`}>
                            Yaps
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </button>
                        <button className={`flex-1 px-6 py-4 transition-all duration-200 text-sm relative group ${
                            isDark 
                                ? 'text-slate-300 hover:text-slate-100 hover:bg-slate-600/40' 
                                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/40'
                        }`}>
                            Yaps & Svar
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                                isDark ? 'bg-slate-500/10' : 'bg-gray-500/10'
                            }`}></div>
                        </button>
                        <button className={`flex-1 px-6 py-4 transition-all duration-200 text-sm relative group ${
                            isDark 
                                ? 'text-slate-300 hover:text-slate-100 hover:bg-slate-600/40' 
                                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/40'
                        }`}>
                            Likes
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                                isDark ? 'bg-slate-500/15' : 'bg-slate-500/15'
                            }`}></div>
                        </button>
                    </nav>
                </div>
        
                
                <div className={`divide-y ${
                    isDark ? 'divide-gray-700' : 'divide-gray-200'
                }`}>
                    {userYaps.length > 0 ? (
                        userYaps.map((yap, index) => (
                            <div 
                                key={yap.id} 
                                className={`transition-colors ${
                                    isDark 
                                        ? 'bg-gray-900 hover:bg-gray-800' 
                                        : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <YapCard yap={yap} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 px-6">
                            <div>
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                                    isDark ? 'bg-slate-600' : 'bg-slate-500'
                                }`}>
                                    <svg className={`w-8 h-8 ${isDark ? 'text-slate-300' : 'text-slate-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m8 0v1a1 1 0 001 1h2a1 1 0 001 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8a1 1 0 011-1h2a1 1 0 001-1V8z" />
                                    </svg>
                                </div>
                                <p className={`text-xl font-bold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-100'}`}>Inga yaps än</p>
                                <p className={`text-sm max-w-xs mx-auto ${isDark ? 'text-slate-400' : 'text-slate-300'}`}>
                                    {isOwnProfile
                                        ? "När du skriver ett yap kommer det att dyka upp här."
                                        : "Den här användaren har inte yap:at än."
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </div>
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
