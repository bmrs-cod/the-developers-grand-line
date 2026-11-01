
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

function RotaProtegida({ children }) {
  const [carregando, setCarregando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function verificarAcesso() {
      const { data, error } = await supabase.auth.getUser();

      if (!ativo) return;

      setAutorizado(!error && Boolean(data.user));
      setCarregando(false);
    }

    verificarAcesso();

    return () => {
      ativo = false;
    };
  }, []);

  if (carregando) {
    return (
      <main className="dashboard-carregando" role="status">
        Verificando acesso ao Quartel-General...
      </main>
    );
  }

  if (!autorizado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RotaProtegida;
