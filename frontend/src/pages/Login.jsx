import { useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Logga In
        </h2>
        
        {/* Error and Success Messages */}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-blue-700 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              placeholder="Enter your password"
              required
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          >
            Logga In
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-5">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}