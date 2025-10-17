const RegisterButton = ({ text, handleClick }) => {
  return (
    <button
      className='px-6 py-2 bg-white text-black font-bold rounded-3xl shadow-md 
                hover:bg-[#f0f0f0] hover:shadow-xl hover:scale-105 active:scale-95 
                transition-all duration-300 ease-out w-50 h-10 cursor-pointer
                relative overflow-hidden group border border-gray-200 
                hover:border-gray-300'
      onClick={handleClick}
    >
      {/* Ripple effect när man klickar */}
      <span className="absolute inset-0 rounded-3xl bg-gray-200/50 scale-0 
                     group-active:scale-110 opacity-0 group-active:opacity-100
                     transition-all duration-200 ease-out"></span>
      
      {/* Subtle shine effect vid hover */}
      <span className="absolute inset-0 rounded-3xl bg-gradient-to-r 
                     from-transparent via-white/30 to-transparent 
                     -translate-x-full group-hover:translate-x-full 
                     transition-transform duration-700 ease-out"></span>
      
      {/* Button text */}
      <span className="relative z-10 group-hover:text-gray-800 transition-colors duration-200">
        {text}
      </span>
    </button>
  );
};

export default RegisterButton;