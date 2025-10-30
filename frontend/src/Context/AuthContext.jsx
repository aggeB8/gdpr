import {createContext, useContext, useState, useEffect} from 'react';
import axiosClient from '../api/axiosClient';




const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storeuser = localStorage.getItem("user");
    if (storeuser) {
      setUser(JSON.parse(storeuser));
    }
  }, []);

  // Login med reCaptcha och backend.

  const login = async (email, password, recaptchaToken) => {
    console.log("Login försök med:", { email, password });

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Inloggning misslyckades");
      }

      const data = await response.json();
      const loggedInUser = {
        name: data.user?.name || data.name || "Användare",
        email: data.user?.email || email,
      };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Register med reCaptcha.

  const register = async (email, password, recaptchaToken, name) => {
    console.log("Register försök med:", { email });

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Registrering misslyckades");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Register error", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
