import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterButton from "../components/RegisterButton";
import AnimatedBackground from "../components/AnimatedBackground";


export default function Register() {
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

    // Enkel validering
    if (formData.password !== formData.confirmPassword) {
      setError("Lösenorden matchar inte! Är du Blind eller Dement?");
      return;
    }

    // TEST: Logga data istället för att skicka till server
    console.log(" FORMULÄRDATA:", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    });

    // Simulera framgång
    setSuccess(" Test lyckades! Bra jobbat du har inte Alzheimers loggad i konsolen.");
    
    // Rensa formuläret efter test
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }, 2000);

    /* URSPRUNGLIG KOD - använd när backend är klar:
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
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Något gick fel vid registrering.");
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
              Join us today
            </h1>
            <p className="text-slate-600 text-sm">
              Create your account to get started
            </p>
          </div>
        
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              placeholder="Confirm your password"
              required
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center">
            <RegisterButton 
              text="Sign up"
              handleClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            />
          </div>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-slate-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
