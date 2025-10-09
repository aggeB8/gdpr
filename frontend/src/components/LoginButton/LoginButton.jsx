const LoginButton = ({ text, handleClick }) => {
  return (
    <button
      className='px-6 py-2 bg-white text-black font-bold rounded-3xl shadow-md 
             hover:bg-[#f0f0f0] active:scale-95 transition-colors duration-326 
             ease-in-out w-50 h-10 cursor-pointer'
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default LoginButton;
