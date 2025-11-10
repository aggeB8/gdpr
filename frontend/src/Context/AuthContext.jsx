import { useEffect, useState, createContext } from "react"
import axiosClient from "../api/axiosClient"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    // Hämta användare från backend om token finns
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            axiosClient
                .get("/auth/me")
                .then((res) => {
                    setUser(res.data.user)
                    localStorage.setItem("user", JSON.stringify(res.data.user))
                })
                .catch(() => {
                    setUser(null)
                    localStorage.removeItem("user")
                    localStorage.removeItem("token")
                })
        } else {
            const storeuser = localStorage.getItem("user")
            if (storeuser) {
                setUser(JSON.parse(storeuser))
            }
        }
    }, [])

    // Login med reCaptcha och backend.

    const login = async (email, password, recaptchaToken) => {
        console.log("Login försök med:", { email, password })

        try {
            const response = await axiosClient.post("/auth/login", {
                email,
                password,
                recaptchaToken
            })

            // Hämta data från svaret
            const { user, token } = response.data

            // Spara användare och token i state och localStorage
            setUser(user)
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)

            return true
        } catch (error) {
            // Visa backend-felmeddelande om det finns
            const errorMsg =
                error.response?.data?.message ||
                error.response?.data?.error ||
                (Array.isArray(error.response?.data?.details)
                    ? error.response.data.details.join(", ")
                    : "") ||
                "Inloggning misslyckades"
            console.error("Login error:", errorMsg)
            throw new Error(errorMsg)
        }
    }

    // Register med reCaptcha.

    const register = async (email, password, recaptchaToken, name) => {
        console.log("Register försök med:", { email })
        try {
            const response = await axiosClient.post("/auth/register", {
                name,
                email,
                password,
                recaptchaToken
            })
            const { user, token } = response.data
            setUser(user)
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            return response.data
        } catch (error) {
            const errorMsg =
                error.response?.data?.message ||
                error.response?.data?.error ||
                (Array.isArray(error.response?.data?.details)
                    ? error.response.data.details.join(", ")
                    : "") ||
                "Registrering misslyckades"
            console.error("Register error", errorMsg)
            throw new Error(errorMsg)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
