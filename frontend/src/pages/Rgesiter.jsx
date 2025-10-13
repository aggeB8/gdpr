import { useState } from "react";


export default function Register() {

  const [formData, setFormData] = useState({
    name: "test",
    email: "test@test.com",
    password: "123456",
    confirmPassword: "123456",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Sign up
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign up
          </button>
        </form>
        

      </div>
    </div>

  );
}
