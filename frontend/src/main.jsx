import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { CookieConsentProvider } from "./context/CookieConsentContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <GoogleReCaptchaProvider reCaptchaKey="6LeSkfwrAAAAAD4Gf6HN4TH62aEIUehYCB4XB804">
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <CookieConsentProvider>
              <App />
            </CookieConsentProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  </StrictMode>
);
