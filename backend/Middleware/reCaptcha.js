export const verifyRecaptcha = async (req, res, next) => {
  const token = req.body.recaptchaToken;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  console.log("🔍 Verifying reCAPTCHA...");
  console.log("Token received:", token ? "Yes" : "No");
  console.log("Secret key exists:", secretKey ? "Yes" : "No");

  if (!token) {
    return res.status(400).json({
      error: "reCAPTCHA token saknas",
    });
  }

  try {
    // ⚡ NYtt sätt: Använd URLSearchParams för korrekt encoding
    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", token);

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    const data = await response.json();
    console.log("🔐 Google's full response:", JSON.stringify(data, null, 2));

    const { success, score, action, "error-codes": errorCodes } = data;

    if (errorCodes && errorCodes.length > 0) {
      console.error("❌ Google reCAPTCHA errors:", errorCodes);
    }

    console.log("reCaptcha verification:", {
      success,
      score,
      action,
      timestamp: new Date().toISOString(),
    });

    if (!success) {
      return res.status(403).json({
        error: "reCAPTCHA verifiering misslyckades",
        details: errorCodes,
      });
    }

    const thresholds = {
      login: 0.4,
      register: 0.5,
    };

    const threshold = thresholds[action] || 0.5;

    if (score < threshold) {
      console.warn(`Low reCAPTCHA score: ${score} for action: ${action}`);
      return res.status(403).json({
        error: "Misstänkt aktivitet upptäckt. Försök igen.",
        score,
      });
    }

    req.recaptchaScore = score;
    req.recaptchaAction = action;

    next();
  } catch (error) {
    console.error("reCAPTCHA verification error:", error.message);
    return res.status(500).json({
      error: "Kunde inte verifiera reCAPTCHA",
    });
  }
};
