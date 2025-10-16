
export default function YapCard({ yap }) {
 
  const handleLike = () => {
    console.log('Gillade yap:', yap.id);
  
  };

  const handleReply = () => {
    console.log('Svarar på yap:', yap.id);
    
  };

  
  const handleReyap = () => {
    console.log('Re-yapar:', yap.id);
    
  };

  return (
   
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
     
      
     
      <div className="flex space-x-3">
        
      
        <img
          src={yap.user?.profileImage || 'https://via.placeholder.com/40?text=👤'}
          
          alt={yap.user?.name}
          className="w-10 h-10 rounded-full"
          
        />
        
      
        <div className="flex-1 min-w-0">
         
          
         
          <div className="flex items-center space-x-1 mb-1">
          
            
         
            <span className="font-semibold text-gray-900">{yap.user?.name}</span>
            
          
            <span className="text-gray-600">@{yap.user?.username}</span>
            
          
            <span className="text-gray-400">·</span>
            
            
            <span className="text-gray-400 text-sm">{yap.timeAgo}</span>
          </div>
          
       
          <p className="text-gray-800 leading-relaxed mb-2">
            {yap.text}
           
          </p>
          
         
          <div className="flex items-center space-x-6 text-gray-500">
            
            <button 
              onClick={handleReply}
              className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
              
            >
              <span>💬</span> 
              <span className="text-sm">{yap.replies || 0}</span>
              
            </button>
            
          
            <button 
              onClick={handleReyap}
              className="flex items-center space-x-1 hover:text-green-500 transition-colors"
              
            >
              <span>🔄</span> {/* Recycling emoji som "re-share" ikon */}
              <span className="text-sm">{yap.reyaps || 0}</span>
            </button>
            
           
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1 hover:text-red-500 transition-colors"
              
            >
              <span>❤️</span> {/*Gilla */}
              <span className="text-sm">{yap.likes || 0}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/*
YapCard KOMPONENTENS 

1. DISPLAY: Visa yap-innehåll på ett läsbart sätt
2. USER INFO: Visa vem som skrev yapet och när
3. INTERACTIONS: Visa räknare för likes/replies/reyaps  
4. ACTIONS: Tillhandahåll knappar för användarinteraktioner
5. LAYOUT: Håll konsistent design med andra yap-cards


- REUSABILITY: Kan användas i feeds, profiler, sökresultat
- CONSISTENCY: Samma layout oavsett var den används
- PERFORMANCE: Lättviktig komponent utan onödig komplexitet
- ACCESSIBILITY: Semantiska HTML-element och hover-states
- EXTENSIBILITY: Lätt att lägga till fler funktioner senare

*/