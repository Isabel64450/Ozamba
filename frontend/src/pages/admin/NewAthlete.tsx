import { useRef, useState } from "react";
import { Plus, Upload, Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTalent } from "../../api/talents";
import { GENDERS, SPORTS, getSportsFor, isGender, isSport } from "../../config/sports";

import "../../styles/NewAthlete.css";

export default function NewAthlete() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    gender: "",
    category: "",
    name: "",
    club: "",
    height: "",
    weight: "",
    from: "",
    position: "",
    birthDate: "",
  });

  // Sports proposés selon la section, postes selon le sport (config/sports.ts)
  const sports = isGender(form.gender) ? getSportsFor(form.gender) : [];
  const positions = isSport(form.category) ? SPORTS[form.category].positions : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // Changer de section ou de sport invalide les choix qui en dépendent
      if (name === "gender") {
        next.category = "";
        next.position = "";
      }
      if (name === "category") next.position = "";
      return next;
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPhoto(imageUrl);
  };

  const handleChoosePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // "Lebron James" → prénom = 1er mot, nom = le reste
    const [firstName, ...rest] = form.name.trim().split(/\s+/);
    const lastName = rest.join(" ");

    if (!firstName || !lastName) {
      setError("Please enter the first name and the last name");
      return;
    }

    setSaving(true);

    try {
      const id = await createTalent({
        gender: form.gender,
        category: form.category,
        firstName,
        lastName,
        position: form.position || null,
        birthDate: form.birthDate || null,
        // Saisie en mètres (1.85), stockée en cm (185)
        height: form.height ? Math.round(Number(form.height) * 100) : null,
        weight: form.weight ? Number(form.weight) : null,
        // club, from et photo : pas encore gérés par l'API
      });

      navigate(`/talents/${form.gender}/${form.category}/${id}`);
    } catch (err: unknown) {
      // 400 : on affiche le message de validation renvoyé par l'API
      if (axios.isAxiosError<{ error?: string }>(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Unable to save the athlete, please try again");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="new-athlete-page">
      <div className="new-athlete-layout">

        {/* =========================
            CONTENU PRINCIPAL
        ========================= */}
        <main className="new-athlete-content">

          {/* HEADER */}
          <div className="new-athlete-header">
            <button className="back-button" onClick={() => navigate(-1)}>
              <span className="back-arrow">&lt;</span>
              <span className="athlete">ATHLETE PROFILE</span>
            </button>
          </div>

          {/* ZONE PRINCIPALE */}
          <div className="new-athlete-area">

            <form
              id="athlete-form"
              className="new-athlete-form"
              onSubmit={handleSubmit}
            >

              {/* =========================
                  COLONNE GAUCHE
              ========================= */}
              <div className="athlete-information">

                {/* SECTION (men / women) */}
                <div className="category-field">
                  <label htmlFor="gender" className="category-label">
                    SECTION
                  </label>

                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="category-select"
                    required
                  >
                    <option value="">Choose the section</option>
                    {Object.entries(GENDERS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* SPORT */}
                <div className="category-field">
                  <label htmlFor="category" className="category-label">
                    CATEGORY
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="category-select"
                    disabled={sports.length === 0}
                    required
                  >
                    <option value="">Choose your sport</option>
                    {sports.map(([slug, sport]) => (
                      <option key={slug} value={slug}>{sport.label}</option>
                    ))}
                  </select>
                </div>

                <div className="player-name-section">
                  <textarea
                    id="name"
                    name="name"
                    placeholder={"NAME OF\nTHE PLAYER"}
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* CLUB : sélection pas encore branchée */}
                <div className="athlete-field club-field">
                  <div className="club-selection">
                    <button
                      type="button"
                      className="club-icon-button"
                      onClick={() => {}}
                      aria-label="Choisir un club"
                    >
                      <Flag size={32} strokeWidth={2} />
                      <span className="club-plus">
                        <Plus size={16} strokeWidth={3} />
                      </span>
                    </button>

                    <button
                      type="button"
                      className="choose-club-link"
                      onClick={() => {}}
                    >
                      Click here to select your club
                    </button>
                  </div>
                </div>

                {/* HEIGHT / WEIGHT */}
                <div className="athlete-fields-row">

                  <div className="athlete-field">
                    <label htmlFor="height">
                      HEIGHT
                    </label>

                    <div className="input-with-unit">
                      <input
                        id="height"
                        name="height"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="1.85 m"
                        value={form.height}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="athlete-field">
                    <label htmlFor="weight">
                      WEIGHT
                    </label>

                    <div className="input-with-unit">
                      <input
                        id="weight"
                        name="weight"
                        type="number"
                        step="1"
                        min="0"
                        placeholder="80 kg"
                        value={form.weight}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                </div>

                <div className="athlete-details">
                  <div className="athlete-field">
                    <label htmlFor="birthDate">
                      BIRTH DATE
                    </label>

                    {/* type="date" renvoie directement YYYY-MM-DD, le format attendu par l'API */}
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={form.birthDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* FROM : pas encore de colonne en base */}
                  <div className="athlete-field">
                    <label htmlFor="from">
                      FROM
                    </label>

                    <input
                      id="from"
                      name="from"
                      type="text"
                      placeholder="City,COUNTRY"
                      value={form.from}
                      onChange={handleChange}
                    />
                  </div>

                  {/* POSITION */}
                  <div className="athlete-field">
                    <label htmlFor="position">
                      POSTE
                    </label>

                    <select
                      id="position"
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                      disabled={positions.length === 0}
                    >
                      <option value="">POSTE</option>
                      {positions.map((position) => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>

              {/* =========================
                  PHOTO (aperçu local, pas encore envoyée)
              ========================= */}
              <div className="athlete-photo-section">

                <div className="athlete-photo-title">
                  ATHLETE PHOTO
                </div>

                <button
                  type="button"
                  className={`athlete-photo ${photo ? "has-photo" : ""}`}
                  onClick={handleChoosePhoto}
                  aria-label="Add athlete photo"
                >
                  {photo ? (
                    <img src={photo} alt="Athlete" />
                  ) : (
                    <>
                      <div className="athlete-placeholder">
                        <div className="athlete-head" />
                        <div className="athlete-body" />
                      </div>

                      <div className="photo-plus">
                        <Plus size={30} strokeWidth={2.5} />
                      </div>
                    </>
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden-file-input"
                  onChange={handlePhotoChange}
                />

                <button
                  type="button"
                  className="upload-photo-button"
                  onClick={handleChoosePhoto}
                >
                  <Upload size={18} />
                  <span>{photo ? "CHANGE PHOTO" : "ADD PHOTO"}</span>
                </button>

                <p className="photo-help">
                  JPG, PNG or WEBP
                </p>

              </div>

            </form>

            {/* SAVE : en dehors du <form>, relié par l'attribut form="athlete-form" */}
            <div className="new-athlete-actions">
              {error && <p className="new-athlete-error">{error}</p>}

              <button
                type="submit"
                form="athlete-form"
                className="save-athlete-button"
                disabled={saving}
              >
                {saving ? "SAVING..." : "SAVE ATHLETE"}
              </button>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}
