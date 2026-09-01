import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"
import axios from "axios";
import WorldClock from "../components/WorldClock";
import LanguageSelector from "../components/LanguageSelector";

import "../styles/Register.css";

interface RegisterFormData {
  userName: string;
  lastName: string;
  name: string;
  email: string;  
  birthDate: string;
  address:string;
  phoneNumber: string;
  facebook: string;
  twitter: string;
  tiktok: string;
  job: string;
  password: string;
  confirmPassword: string;
  category: string;
}

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>({
    userName: "",
    lastName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    address:"",
    phoneNumber: "",
    facebook: "",
    twitter: "",
    tiktok: "",
    job: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (
      !formData.userName ||
      !formData.lastName ||
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe doivent être identiques.");
      return;
    }

    try {
       
      setLoading(true);

      const response = await api.post("/auth/register", formData);      
      
      setSuccess(true);
    } catch (error: unknown) {
     if (axios.isAxiosError(error)) {
    setError(
      error.response?.data?.error ??
      "Erreur lors de l'inscription."
    );
  } else {
    setError("Une erreur est survenue.");
  }
    }
  };

  return (
    <main className="register-page">

      {/* PARTIE PROFIL */}
      <section className="register-profile">

      {/* Logo entreprise */}
      <img
        src="/OzambaLogo.png"
        alt="Ozamba"
        className="register-company-logo"
      />

      <div className="profile-content">

        {/* Photo de profil */}
        <div className="profile-picture">
          <span>+</span>
        </div>

        {/* Welcome */}
        <h2 className="profile-welcome">
          Welcome {formData.userName || "ZEUS"}
        </h2>

        {/* Description */}
        <p className="profile-description">
          First things first, you can change your profile
          picture and edit your informations.
        </p>

      </div>

    </section>



      {/* PARTIE FORMULAIRE */}
      <section className="register-form-section">

        <div className="register-header">
          <button
            type="button"
            className="register-back"
            onClick={() => navigate("/login")}
          >
            
          </button>

          <h1>
            CREATING A NEW ACCOUNT
          </h1>
        </div>

        <form className="register-form"  onSubmit={handleSubmit} >

          <div className="form-field">
    <label htmlFor="name">Name</label>

    <div className="input-wrapper">
      <span className="input-icon">👤</span>

      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Write your name here"
      />
    </div>
  </div>

         <div className="form-field">
    <label htmlFor="lastName">Last Name</label>

    <div className="input-wrapper">
      <span className="input-icon">👤</span>

      <input
        id="lastName"
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Write your last name here"
      />
    </div>
  </div>

          <div className="form-field">
    <label htmlFor="userName">Username</label>

    <div className="input-wrapper">
      <span className="input-icon">👤</span>

      <input
        id="userName"
        name="userName"
        type="text"
        value={formData.userName}
        onChange={handleChange}
        placeholder="Write your username here"
      />
    </div>
  </div>

           <div className="form-field">
    <label htmlFor="email">Email</label>

    <div className="input-wrapper">
      <span className="input-icon">✉</span>

      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Write your email here"
      />
    </div>
  </div>


      
          <div className="form-field">
    <label htmlFor="birthDate">Birth Date</label>

    <div className="input-wrapper">
      <span className="input-icon">📅</span>

      <input
        id="birthDate"
        name="birthDate"
        type="date"
        value={formData.birthDate}
        onChange={handleChange}
      />
    </div>
  </div>

      <div className="form-field">
    <label htmlFor="Adress">Adress</label>

    <div className="input-wrapper">
      

      <input
        id="address"
        name="address"
        type="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Write your address here"
      />
    </div>
  </div>

           <div className="form-field">
    <label htmlFor="phoneNumber">Phone Number</label>

    <div className="input-wrapper">
      <span className="input-icon">☎</span>

      <input
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Write your phone here"
      />
    </div>
  </div>
          <div className="form-field">
    <label htmlFor="facebook">Facebook</label>

    <div className="input-wrapper">
      <span className="input-icon">f</span>

      <input
        id="facebook"
        name="facebook"
        type="text"
        value={formData.facebook}
        onChange={handleChange}
        placeholder="Write your Facebook here"
      />
    </div>
  </div>

          <div className="form-field">
    <label htmlFor="twitter">Twitter</label>

    <div className="input-wrapper">
      <span className="input-icon">𝕏</span>

      <input
        id="twitter"
        name="twitter"
        type="text"
        value={formData.twitter}
        onChange={handleChange}
        placeholder="Write your Twitter here"
      />
    </div>
  </div>

          <div className="form-field">
    <label htmlFor="tiktok">TikTok</label>

    <div className="input-wrapper">
      <span className="input-icon">♪</span>

      <input
        id="tiktok"
        name="tiktok"
        type="text"
        value={formData.tiktok}
        onChange={handleChange}
        placeholder="Write your TikTok here"
      />
    </div>
  </div>
          

    <div className="form-field full-width">
    <label htmlFor="job">Job</label>

    <div className="input-wrapper">
      <span className="input-icon">💼</span>

      <input
        id="job"
        name="job"
        type="text"
        value={formData.job}
        onChange={handleChange}
        placeholder="Write your job here"
      />
    </div>
  </div>

      <div className="form-field full-width">

    <label>Category</label>

    <div className="category-options">

      {[
        "ZEUS",
        "HERMES",
        "MERCURE",
        "JANUS",
        "DEVOIR",
        "CO-EQUIPIER",
      ].map((category) => (
        <button
          key={category}
          type="button"
          className={
            formData.category === category
              ? "category-button selected"
              : "category-button"
          }
          onClick={() =>
            setFormData((previous) => ({
              ...previous,
              category,
            }))
          }
        >
          {category}
        </button>
      ))}

    </div>
  </div>


    <div className="form-field">
    <label htmlFor="password">Password</label>

    <div className="input-wrapper">
      <span className="input-icon">🔒</span>

      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Write your password here"
      />
    </div>
  </div>
           <div className="form-field">
    <label htmlFor="confirmPassword">
      Confirm Password
    </label>

    <div className="input-wrapper">
      <span className="input-icon">🔒</span>

      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
      />
    </div>
  </div>

          {error && (
            <p className="register-error">
              {error}
            </p>
          )}

          {success && (
            <p className="register-success">
              Compte créé avec succès. Vérifiez votre email.
            </p>
          )}

          <button
            type="submit"
            className="register-submit"
            disabled={loading}
          >
            {loading
              ? "Validating..."
              : "Validate"}
          </button>

        </form>

        <WorldClock />
        <LanguageSelector />

      </section>

    </main>
  );
}
