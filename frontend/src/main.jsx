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
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      scriptProps={{ async: true, defer: true, appendTo: "head" }}
    >
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CookieConsentProvider>
              <App />
            </CookieConsentProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  </StrictMode>
);
