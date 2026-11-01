
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { buscarProjeto } from "../services/githubService";

function ProjetoDetalhes() {
  const { nome } = useParams();

  const [projeto, setProjeto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setCarregando(true);
      setErro("");
      setProjeto(null);

      try {
        const dados = await buscarProjeto(nome);

        if (ativo) {
          setProjeto(dados);
        }
      } catch {
        if (ativo) {
          setErro("Não foi possível carregar este projeto.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [nome]);

  if (carregando) {
    return (
      <main className="detalhes-pagina">
        <div className="egg-status" role="status">
          <div className="egg-spinner" />
          <p>Consultando os arquivos de Egghead...</p>
        </div>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="detalhes-pagina">
        <div className="egg-status" role="alert">
          <h1>Falha na conexão</h1>
          <p>{erro}</p>
          <Link to="/projetos">Voltar aos projetos</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="detalhes-pagina">
      <Link className="detalhes-voltar" to="/projetos">
        ← Voltar ao laboratório
      </Link>

      <header className="detalhes-cabecalho">
        <span>EGGHEAD — ARQUIVO TECNOLÓGICO</span>

        <h1>{projeto.name.replaceAll("-", " ")}</h1>

        <p>
          {projeto.description ||
            "Projeto desenvolvido durante minha jornada como programador."}
        </p>
      </header>

      <section className="detalhes-painel">
        <div className="detalhes-painel-topo">
          <span>REGISTRO DO PROJETO</span>
          <span>GITHUB DATABASE</span>
        </div>

        <div className="detalhes-visual">
          <div className="detalhes-circulo">
            <span>{"</>"}</span>
          </div>

          <p>VEGAPUNK RESEARCH LAB</p>
        </div>

        <div className="detalhes-informacoes">
          <div>
            <span>LINGUAGEM PRINCIPAL</span>
            <strong>{projeto.language || "Não informada"}</strong>
          </div>

          <div>
            <span>ÚLTIMA ATUALIZAÇÃO</span>
            <strong>
              {new Date(projeto.updated_at).toLocaleDateString("pt-BR")}
            </strong>
          </div>

          <div>
            <span>ESTRELAS</span>
            <strong>{projeto.stargazers_count}</strong>
          </div>

          <div>
            <span>VISIBILIDADE</span>
            <strong>{projeto.private ? "Privado" : "Público"}</strong>
          </div>
        </div>

        <div className="detalhes-acoes">
          <a
            href={projeto.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="detalhes-botao"
          >
            Ver código no GitHub ↗
          </a>

          {projeto.homepage && (
            <a
              href={projeto.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="detalhes-botao secundario"
            >
              Acessar site publicado ↗
            </a>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProjetoDetalhes;
