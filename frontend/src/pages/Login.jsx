import { useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx";
import { useCookieConsent } from "../context/CookieConsentContext.jsx";
import { useNavigate } from "react-router-dom";
import RegisterButton from "../components/RegisterButton";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Login() {
  const { login } = useAuth();
  const { consent } = useCookieConsent();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Hantera inmatning
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Skicka formulär
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Blockera om nödvändiga cookies ej accepterade
    if (!consent || consent.necessary !== true) {
      setError("Du måste acceptera nödvändiga cookies för att logga in.");
      return;
    }
    if (!window.localStorage.getItem('yapsspace_cookie_consent')) {
      setError("Du måste acceptera cookies för att logga in.");
      return;
    }

    // Försök logga in med AuthContext
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message || "Inloggning misslyckades.");
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f3ff] to-[#e3f0ff] px-4 relative z-10">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center">
          {/* Ikon */}
          <div className="bg-violet-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#7c3aed" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 6.75V17.25C21 18.4926 19.9926 19.5 18.75 19.5H5.25C4.00736 19.5 3 18.4926 3 17.25V6.75M21 6.75C21 5.50736 19.9926 4.5 18.75 4.5H5.25C4.00736 4.5 3 5.50736 3 6.75M21 6.75L12 13.5L3 6.75" />
            </svg>
          </div>
          {/* Rubrik och underrubrik */}
          <h1 className="text-3xl font-extrabold text-slate-800 mb-1">Välkommen tillbaka!</h1>
          <p className="text-slate-600 text-base mb-8">Logga in för att fortsätta ditt yap-äventyr</p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          {/* Formulär */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-violet-400 focus:outline-none text-gray-900 bg-slate-50"
                placeholder="din@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Lösenord</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-violet-400 focus:outline-none text-gray-900 bg-slate-50"
                placeholder="********"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-400 text-white font-bold text-lg shadow-md hover:from-violet-600 hover:to-blue-500 transition-all"
            >
              Logga In
            </button>
          </form>

          {/* Länk till registrering */}
          <div className="text-center mt-6">
            <p className="text-slate-600 text-sm">
              Har du inget konto ännu?{' '}
              <button onClick={() => navigate('/register')} className="text-violet-600 hover:text-violet-800 font-medium hover:underline transition-colors">
                Registrera dig här
              </button>
            </p>
          </div>

          {/* Demo credentials-box */}
          <div className="w-full mt-8 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 text-sm">
            <div className="font-semibold mb-1 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6366f1" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v3.75m9 0V17.25A2.25 2.25 0 0114.25 19.5h-4.5A2.25 2.25 0 017.5 17.25V10.5m9 0h-9" />
              </svg>
              Demo Credentials:
            </div>
            <div>Email: <span className="font-mono bg-slate-200 px-1 rounded">test@test.com</span></div>
            <div>Lösenord: <span className="font-mono bg-slate-200 px-1 rounded">123456</span></div>
          </div>
        </div>
      </div>
    </>
  );
}