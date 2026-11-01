
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RotaProtegida from "./components/RotaProtegida";

// Páginas carregadas somente quando acessadas
const Projetos = lazy(() => import("./pages/Projetos"));
const ProjetoDetalhes = lazy(() => import("./pages/ProjetoDetalhes"));
const Contato = lazy(() => import("./pages/Contato"));
const Login = lazy(() => import("./pages/Login"));
const RecuperarSenha = lazy(() => import("./pages/RecuperarSenha"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const [tema, setTema] = useState(() => {
    try {
      const temaSalvo = localStorage.getItem("portfolio-tema");

      return temaSalvo === "claro" || temaSalvo === "escuro"
        ? temaSalvo
        : "claro";
    } catch {
      return "claro";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);

    try {
      localStorage.setItem("portfolio-tema", tema);
    } catch {
      // O site continua funcionando sem armazenamento.
    }
  }, [tema]);

  function alternarTema() {
    setTema((anterior) =>
      anterior === "claro" ? "escuro" : "claro"
    );
  }

  return (
    <BrowserRouter>
      <button
        type="button"
        className="botao-tema"
        onClick={alternarTema}
        aria-label={
          tema === "claro"
            ? "Ativar modo noite"
            : "Ativar modo dia"
        }
        title={
          tema === "claro"
            ? "Ativar modo noite"
            : "Ativar modo dia"
        }
      >
        {tema === "claro" ? "☾" : "☀"}
      </button>

      <Suspense
        fallback={
          <p role="status" className="carregando-mar">
            Carregando página...
          </p>
        }
      >
        <Routes>
          <Route
            path="/"
            element={<Home tema={tema} />}
          />

          <Route
            path="/projetos"
            element={<Projetos />}
          />

          <Route
            path="/projetos/:nome"
            element={<ProjetoDetalhes />}
          />

          <Route
            path="/contato"
            element={<Contato />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/recuperar-senha"
            element={<RecuperarSenha />}
          />

          <Route
            path="/dashboard"
            element={
              <RotaProtegida>
                <Dashboard />
              </RotaProtegida>
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
