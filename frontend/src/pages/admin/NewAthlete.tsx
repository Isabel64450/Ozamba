import { useRef, useState } from "react";
import { Plus, Upload, Flag } from "lucide-react";
import {  useNavigate } from "react-router-dom";

import '../../styles/NewAthlete.css'

export default function NewAthlete() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [photo, setPhoto] = useState<string | null> (null);

  const [form, setForm] = useState({
    category: "",
    name: "",
    club: "",
    height: "",
    weight: "",
    from:"",
    poste: "",
    birthDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement>
)  => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPhoto(imageUrl);
  };

  const handleChoosePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Athlete:", form);
    console.log("Photo:", photo);

    // Ici tu pourras ajouter ton appel API
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
                <div className="category-field">
                     <label htmlFor="category" className="category-label">
                CATEGORY
              </label>

             <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="category-select"
              >
                <option value="">Choose your sport</option>
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                
                <option value="rugby">Flag</option>
                <option value="volleyball">Volleyball</option>
                <option value="handball">Hockey</option>
                
              </select>
                </div>
              
                <div className="player-name-section">
                 

                 <textarea
                     id="name"
                     name="name"
                     placeholder={"NAME OF\nTHE PLAYER"}
                     value={form.name}
                     onChange={handleChange}
/>
                </div>

                {/* CLUB */}
                <div className="athlete-field club-field">
  

                <div className="club-selection">
                     <button
                      type="button"
                      className="club-icon-button"
                      onClick={() => {
      
                        }}
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
                         onClick={() => {
                         
                         }}
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
                        placeholder="0m00"
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
                        placeholder="00kg"
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

                  <input
                    id="birthDate"
                    name="birthDate"
                    placeholder="DD month YYYY"
                    type="text"
                    value={form.birthDate}
                    onChange={handleChange}
                  />
                </div>
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
                    value={form.poste}
                    onChange={handleChange}
                  >
                    <option value="">POSTE</option>
                    <option value="goalkeeper">Goalkeeper</option>
                    <option value="defender">Defender</option>
                    <option value="midfielder">Midfielder</option>
                    <option value="forward">Forward</option>
                  </select>
                </div>

               
                

              </div>

              </div>
               
              {/* =========================
                  PHOTO
              ========================= */}
              <div className="athlete-photo-section">

                <div className="athlete-photo-title">
                  ATHLETE PHOTO
                </div>

                <button
                  type="button"
                  className={`athlete-photo ${
                    photo ? "has-photo" : ""
                  }`}
                  onClick={handleChoosePhoto}
                  aria-label="Add athlete photo"
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt="Athlete"
                    />
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
                  <span>
                    {photo ? "CHANGE PHOTO" : "ADD PHOTO"}
                  </span>
                </button>

                <p className="photo-help">
                  JPG, PNG or WEBP
                </p>

              </div>

            </form>

            {/* SAVE */}
            <div className="new-athlete-actions">
              <button
                type="submit"
                
                className="save-athlete-button"
                
              >
                SAVE ATHLETE
              </button>
            </div>

          </div>
        </main>

        

      </div>
    </div>
  );
}
