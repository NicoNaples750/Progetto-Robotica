import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import styles from "../styles/SkillList.module.css";

export default function SkillList() {
  const { user, logout } = useAuth();
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    axios
      .get(`${API_URL}/skills`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSkills(res.data);
        } else if (res.data.skills) {
          setSkills(res.data.skills);
        } else {
          console.error("❌ Formato dati API inatteso:", res.data);
        }
      })
      .catch((err) => console.error("❌ Errore nel recupero delle skills:", err));
  };

  const handleLogout = () => {
    logout();
  };

  const handleAddOrUpdateSkill = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !level) {
      setError("⚠️ Nome e livello sono obbligatori.");
      setLoading(false);
      return;
    }

    const skillData = { name, level };

    if (editingId) {
      axios
        .put(`${API_URL}/skills/${editingId}`, skillData)
        .then(() => {
          fetchSkills();
          resetForm();
        })
        .catch((err) => {
          console.error("❌ Errore durante la modifica della skill:", err);
          setError("❌ Errore durante la modifica.");
        })
        .finally(() => setLoading(false));
    } else {
      axios
        .post(`${API_URL}/skills`, skillData)
        .then(() => {
          fetchSkills();
          resetForm();
        })
        .catch((err) => {
          console.error("❌ Errore durante l'aggiunta della skill:", err);
          setError("❌ Errore durante l'aggiunta.");
        })
        .finally(() => setLoading(false));
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    setName(skill.name);
    setLevel(skill.level);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa skill?")) return;
    axios
      .delete(`${API_URL}/skills/${id}`)
      .then(() => {
        fetchSkills();
      })
      .catch((err) => {
        console.error("❌ Errore durante l'eliminazione:", err);
        setError("❌ Errore durante l'eliminazione.");
      });
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setLevel("");
    setError("");
  };

  if (user === null) {
    return <p>🔄 Caricamento utente...</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Elenco delle Skills</h2>
      <button onClick={handleLogout} className={styles.button}>🔒 Logout</button>

      {user?.role === "tecnico" && (
        <form className={styles.form} onSubmit={handleAddOrUpdateSkill}>
          <input
            className={styles.input}
            type="text"
            placeholder="Nome skill"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select
            className={styles.select}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="">Seleziona livello</option>
            <option value="Base">Base</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzato">Avanzato</option>
          </select>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className={styles.button} type="submit" disabled={loading}>
            {editingId ? "💾 Salva" : "➕ Aggiungi"}
          </button>
          {editingId && (
            <button
              className={styles.button}
              type="button"
              onClick={resetForm}
              style={{ marginLeft: "0.5rem" }}
            >
              ❌ Annulla
            </button>
          )}
        </form>
      )}

      <ul className={styles.skillList}>
        {skills.length > 0 ? (
          skills.map((skill) => (
            <li key={skill._id} className={styles.skillItem}>
              <strong>{skill.name}</strong> - Livello: {skill.level}{" "}
              {user?.role === "tecnico" && (
                <>
                  <button className={styles.button} onClick={() => handleEdit(skill)}>
                    ✏️ Modifica
                  </button>{" "}
                  <button className={styles.button} onClick={() => handleDelete(skill._id)}>
                    🗑️ Elimina
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>⚠️ Nessuna skill trovata.</p>
        )}
      </ul>
    </div>
  );
}





