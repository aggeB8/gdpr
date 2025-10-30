import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//  REGISTER - Skapa ny användare
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    console.log(" Register attempt for:", email);
    
    // Validering
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "Alla fält krävs (name, email, password)" 
      });
    }
    /*
    // Kontrollera e-postformat
    const emailRegex = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/;//Skapar ett mönster för giltig e-post. För att kunna testa formatet
    if (!emailRegex.test(email)) {//Testar om e-post matchar mönstret.Kollar om den inte matchar
      // Fångar ogiltiga adresser
      
      return res.status(400).json({ message: "Ogiltig e-postadress" });
    }*/

    // Kontrollera lösenordets längd
    if (password.length < 6) {
      return res.status(400).json({ message: "Lösenordet måste vara minst 6 tecken" });
    }
    
    // Kolla om email redan finns
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        message: "Email redan registrerad" 
      });
    }
    
    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Skapa användare
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    // Skapa JWT token med din JWT_SECRET från .env
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,  // ← Här används din hemliga nyckel!
      { expiresIn: '24h' }
    );
    
    // Skicka tillbaka framgång
    res.status(201).json({
      message: "Registrering lyckades!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      },
      token
    });
    
  } catch (error) {
    console.error(" Register error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  LOGIN - Logga in befintlig användare  
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log(" Login attempt for:", email);
    
    // Validering
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email och lösenord krävs" 
      });
    }
    
    // Hitta användare
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: "Felaktig email eller lösenord" 
      });
    }
    
    // Jämför lösenord
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        message: "Felaktig email eller lösenord" 
      });
    }
    
    // Skapa JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,  
      { expiresIn: '24h' }
    );
    
    // Skicka tillbaka framgång
    res.status(200).json({
      message: "Login lyckades!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
    
  } catch (error) {
    console.error(" Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "Användare hittades inte" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};