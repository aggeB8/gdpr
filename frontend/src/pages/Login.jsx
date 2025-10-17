import { useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import RegisterButton from "../components/RegisterButton";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Login() {
  const { login } = useAuth();
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

    // Försök logga in med AuthContext
    const success = login(formData.email, formData.password);
    
    if (success) {
      setSuccess("✅ Inloggning lyckades! Omdirigerar...");
      setTimeout(() => {
        navigate("/"); // Gå till startsidan efter lyckad inloggning
      }, 1000);
    } else {
      setError("❌ Fel email eller lösenord. Prova test@test.com med lösenord 123456");
    }

    /*  använd när backend är klar:
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        setSuccess("Inloggning lyckades!");
        // Här kan du hantera token/redirect
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Något gick fel vid inloggning.");
      } else {
        setError("Kunde inte ansluta till servern.");
      }
    }
    */
  };

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div className="w-full max-w-md glass-card p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text-pro mb-2">
              Welcome back
            </h1>
            <p className="text-slate-600 text-sm">
              Sign in to your account to continue
            </p>
          </div>
        
          {/* Error and Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {success}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
           
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm 
                         focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 
                         transition-all duration-200 text-slate-900 placeholder-slate-400"
                required
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm 
                         focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 
                         transition-all duration-200 text-slate-900 placeholder-slate-400"
                required
              />
          </div>
          
          
          <div className="flex justify-center">
            <RegisterButton 
              text="Logga In"
              handleClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            />
          </div>
        </form>
        
          <div className="text-center mt-6">
            <p className="text-slate-600 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}