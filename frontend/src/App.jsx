import './App.css';
import LoginButton from './components/LoginButton/loginButton';

const handleClick1 = () => {
  window.location.href = '/login';
  console.log('logged in');
};

const handleClick2 = () => {
  window.location.href = '/register';
  console.log('registered');
};

function App() {
  return (
    <>
      <LoginButton text={'Login'} handleClick={handleClick1} />
      <LoginButton text={'Register'} handleClick={handleClick2} />
    </>
  );
}

export default App;
