import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterButton from "../components/RegisterButton";
import AnimatedBackground from "../components/AnimatedBackground";
import axios from "axios";
import { useCookieConsent } from "../context/CookieConsentContext.jsx";

export default function Register() {
  const { consent } = useCookieConsent();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  // Skicka formulär - TESTVERSION (byt tillbaka senare)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Blockera om nödvändiga cookies ej accepterade
    if (!consent || consent.necessary !== true) {
      setError("Du måste acceptera nödvändiga cookies för att skapa konto.");
      return;
    }
    if (!window.localStorage.getItem('yapsspace_cookie_consent')) {
      setError("Du måste acceptera cookies för att skapa konto.");
      return;
    }

    // Enkel validering
    if (formData.password !== formData.confirmPassword) {
      setError("Lösenorden matchar inte!");
      return;
    }

    // RIKTIG KOD - använd axiosClient istället för vanlig axios
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        setSuccess("Registrering lyckades!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        
        // Navigera till login efter framgång
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Något gick fel vid registrering.");
      } else {
        setError("Kunde inte ansluta till servern.");
      }
    }
    
  };



  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex items-center justify-center relative z-10 px-4 bg-gradient-to-br from-[#f5f3ff] to-[#e3f0ff]">
        <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-violet-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#7c3aed" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.25v-1.5A2.25 2.25 0 016.75 15.5h10.5a2.25 2.25 0 012.25 2.25v1.5M18 19.25a2.25 2.25 0 002.25-2.25V17a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 17v.25A2.25 2.25 0 006 19.25" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-1">Gå med idag!</h1>
            <p className="text-slate-600 text-base">Skapa ditt konto och börja yappa direkt</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Namn</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-900 bg-slate-50"
                placeholder="Ditt fulla namn"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="din@email.com"
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-violet-400 focus:outline-none text-gray-900 bg-slate-50"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
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
              <div className="w-1/2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Bekräfta</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-violet-400 focus:outline-none text-gray-900 bg-slate-50"
                  placeholder="********"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-400 text-white font-bold text-lg shadow-md hover:from-violet-600 hover:to-blue-500 transition-all"
            >
              Skapa Konto
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-slate-600 text-sm">
              Har du redan ett konto?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-violet-600 hover:text-violet-800 font-medium hover:underline transition-colors"
              >
                Logga in här
              </button>
            </p>
          </div>

          <div className="w-full mt-8 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 text-sm">
            <div className="font-semibold mb-1 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6366f1" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v3.75m9 0V17.25A2.25 2.25 0 0114.25 19.5h-4.5A2.25 2.25 0 017.5 17.25V10.5m9 0h-9" />
              </svg>
              Lösenordskrav:
            </div>
            <ul className="list-disc ml-6 mt-1">
              <li>Minst 6 tecken långt</li>
              <li>Använd en stark kombination av bokstäver och siffror</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
