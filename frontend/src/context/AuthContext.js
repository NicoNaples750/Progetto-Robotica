import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null: in caricamento

  useEffect(() => {
    // 🔁 Simulazione login automatico con utente tecnico (o recupero API reale)
    const fetchUser = async () => {
      try {
        // 🔁 Simulazione (puoi sostituire con fetch/axios reale)
        const fakeUser = { username: "Mario", role: "tecnico" }; // Cambia in "user" per testare
        await new Promise((res) => setTimeout(res, 1000)); // Simula delay
        setUser(fakeUser);
      } catch (err) {
        console.error("Errore nel recupero utente:", err);
        setUser({ role: "user" }); // Fallback
      }
    };

    fetchUser();
  }, []);

  // Funzione per il logout
  const logout = () => {
    setUser(null); // Resetta lo stato dell'utente
    console.log("Utente disconnesso"); // Puoi aggiungere altre azioni, come la rimozione del token
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

