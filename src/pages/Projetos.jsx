
import { useEffect, useState } from "react";
import { buscarProjetos } from "../services/githubService";
import ProjetoCard from "../components/ProjetoCard";
import { Link } from "react-router-dom";

function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarProjetos();
        setProjetos(dados);
      } catch {
        setErro("Não foi possível carregar os projetos do GitHub.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  const linguagens = [
    "Todos",
    ...new Set(projetos.map((p) => p.language || "Outros"))
  ];

  const projetosFiltrados = filtro === "Todos"
    ? projetos
    : projetos.filter((p) => (p.language || "Outros") === filtro);

  return (
    <main className="egghead-pagina">
      
<nav className="navegacao-egghead">
  <Link to="/">Retornar para a Grand Line</Link>
  <Link to="/contato">Entrar em contato</Link>
</nav>

<header className="egghead-cabecalho">
        <span className="egghead-etiqueta">
          ◈ EGGHEAD — LABORATÓRIO DE PROJETOS
        </span>

        <h1>Minhas invenções</h1>

        <p>
          Explore os projetos desenvolvidos ao longo da
          minha jornada como programador.
        </p>

        <div className="egghead-linha" />
      </header>

      {carregando && (
        <div className="egg-status">
          <div className="egg-spinner" />
          <p>Carregando arquivos do laboratório...</p>
        </div>
      )}

      {erro && (
        <div className="egg-status" role="alert">
          <h2>Erro de conexão</h2>
          <p>{erro}</p>
          <button onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && (
        <>
          <div className="egghead-filtros">
            <span>FILTRAR TECNOLOGIA:</span>

            <div className="egghead-filtro-botoes">
              {linguagens.map((linguagem) => (
                <button
                  key={linguagem}
                  className={filtro === linguagem ? "ativo" : ""}
                  onClick={() => setFiltro(linguagem)}
                >
                  {linguagem}
                </button>
              ))}
            </div>
          </div>

          {projetos.length === 0 ? (
            <p className="egg-vazio">Nenhum projeto encontrado.</p>
          ) : projetosFiltrados.length === 0 ? (
            <p className="egg-vazio">Nenhum projeto corresponde ao filtro.</p>
          ) : (
            <section className="egghead-grid">
              {projetosFiltrados.map((projeto, index) => (
                <ProjetoCard
                  key={projeto.id}
                  projeto={projeto}
                  numero={index + 1}
                />
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default Projetos;
