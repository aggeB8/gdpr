import { useTheme } from '../Context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center w-12 h-12 
        rounded-full transition-all duration-300 transform hover:scale-110
        ${isDark 
          ? 'bg-slate-600 hover:bg-slate-500 text-yellow-400 border border-slate-500' 
          : 'bg-slate-200 hover:bg-slate-300 text-blue-600 border border-slate-300'
        }
        shadow-lg hover:shadow-xl group
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      
      <div className={`
        absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
        transition-opacity duration-300 blur-md
        ${isDark ? 'bg-yellow-400/20' : 'bg-blue-500/20'}
      `}></div>
      
     
      <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
        {isDark ? (
          // Sun icon for switching to light mode
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM12 1.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V2.5A.75.75 0 0112 1.75zM4.22 4.22a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06L4.22 5.28a.75.75 0 010-1.06zM1.75 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H2.5a.75.75 0 01-.75-.75zM4.22 19.78a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zM12 22.25a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM19.78 19.78a.75.75 0 01-1.06 0l-1.06-1.06a.75.75 0 111.06-1.06l1.06 1.06a.75.75 0 010 1.06zM22.25 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM19.78 4.22a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0z"/>
          </svg>
        ) : (
          // Moon icon for switching to dark mode
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/>
          </svg>
        )}
      </div>

      
      <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-30 group-active:scale-110 transition-all duration-200 bg-current"></div>
    </button>
  );
}