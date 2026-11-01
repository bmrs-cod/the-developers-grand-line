
import { Link } from "react-router-dom";

function ProjetoCard({ projeto, numero }) {
  const data = new Date(projeto.updated_at).toLocaleDateString("pt-BR");

  return (
    <article className="egg-card">
      <div className="egg-card-topo">
        <span className="egg-numero">
          ARQUIVO {String(numero).padStart(3, "0")}
        </span>

        <span className="egg-linguagem">
          {projeto.language || "OUTROS"}
        </span>
      </div>

      <div className="egg-card-visual">
        <div className="egg-circulo">
          <span>{"</>"}</span>
        </div>
        <span>VEGAPUNK RESEARCH LAB</span>
      </div>

      <div className="egg-card-conteudo">
        <h2>{projeto.name.replaceAll("-", " ")}</h2>

        <p>{projeto.description || "Projeto desenvolvido durante minha jornada como programador."}</p>

        <div className="egg-card-rodape">
          <small>Atualizado em {data}</small>

          <Link to={`/projetos/${encodeURIComponent(projeto.name)}`}>
            Ver projeto →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProjetoCard;
