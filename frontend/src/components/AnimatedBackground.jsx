export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        

        <div 
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '0s', animationDuration: '8s' }}
        />
        
        <div 
          className="absolute bottom-1/4 -right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-200/15 to-purple-200/15 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '4s', animationDuration: '10s' }}
        />
        
        <div 
          className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '2s', animationDuration: '12s' }}
        />
      </div>

   
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-slate-400" />
        </svg>
      </div>

     
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/30 rounded-full animate-float"
            style={{
              left: `${20 + (i * 6)}%`,
              top: `${10 + (i * 5)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + (i % 3) * 2}s`
            }}
          />
        ))}
      </div>

    
      <div className="absolute top-20 right-20 w-32 h-32 border border-blue-200/20 rounded-lg rotate-12 animate-rotate-slow" />
      <div className="absolute bottom-32 left-20 w-24 h-24 border border-indigo-200/20 rounded-full animate-pulse-slow" />
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-200/10 to-indigo-200/10 rounded transform rotate-45 animate-rotate-slow" />
      
 
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line 
          x1="0" y1="25" x2="100" y2="30" 
          stroke="url(#gradient1)" 
          strokeWidth="0.1" 
          opacity="0.3"
          className="animate-slide"
        />
        <line 
          x1="0" y1="70" x2="100" y2="65" 
          stroke="url(#gradient2)" 
          strokeWidth="0.1" 
          opacity="0.2"
          className="animate-slide-reverse"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}