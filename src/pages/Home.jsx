
import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import luffySkypiea from "../assets/luffy-skypiea.png";
import { buscarProjetos } from "../services/githubService";
import { buscarDestaques } from "../services/destaquesService";

const Cena3D = lazy(() => import("../components/Cena3D"));

const destinos = [
  {
    rota: "/",
    nome: "Início",
    ilha: "Vila Foosha",
    classe: "foosha",
  },
  {
    rota: "/contato",
    nome: "Contato",
    ilha: "Marineford",
    classe: "marineford",
  },
  {
    rota: "/projetos",
    nome: "Projetos",
    ilha: "Egghead",
    classe: "egghead",
  },
];

const estrelas = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  esquerda: `${(i * 37.7 + 11) % 98}%`,
  topo: `${(i * 19.3 + 5) % 30}%`,
  tamanho: 1.5 + (i % 3),
  atraso: `${(i % 7) * -0.45}s`,
}));

function Home({ tema = "claro" }) {
  const modoNoite = tema === "escuro";

  const [mostrarCena, setMostrarCena] = useState(false);
  const [mostrarLuffy, setMostrarLuffy] = useState(false);
  const [destaques, setDestaques] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Aguarda 1,8 segundo antes de iniciar o cenário 3D
  useEffect(() => {
    const tempo = window.setTimeout(() => {
      setMostrarCena(true);
    }, 1800);

    return () => window.clearTimeout(tempo);
  }, []);

  // Easter egg de Skypiea após 30 segundos
  useEffect(() => {
    const tempo = window.setTimeout(() => {
      setMostrarLuffy(true);
    }, 30000);

    return () => window.clearTimeout(tempo);
  }, []);

  // Busca os projetos selecionados no dashboard
  useEffect(() => {
    let ativo = true;

    async function carregarDestaques() {
      try {
        const [nomes, projetos] = await Promise.all([
          buscarDestaques(),
          buscarProjetos(),
        ]);

        const selecionados = nomes
          .map((nome) =>
            projetos.find((projeto) => projeto.name === nome)
          )
          .filter(Boolean);

        if (ativo) {
          setDestaques(selecionados);
          setErro("");
        }
      } catch {
        if (ativo) {
          setErro(
            "Não foi possível carregar os projetos em destaque."
          );
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDestaques();

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <>
      <main className={`home ${modoNoite ? "home-noite" : ""}`}>
        {/* Oceano e cena 3D */}
        <div className="oceano-3d">
          {mostrarCena ? (
            <Suspense
              fallback={
                <div
                  className="oceano-aguardando"
                  role="status"
                  aria-label="Preparando o cenário da Grand Line"
                />
              }
            >
              <Cena3D tema={tema} />
            </Suspense>
          ) : (
            <div
              className="oceano-aguardando"
              role="status"
              aria-label="Preparando o cenário da Grand Line"
            />
          )}
        </div>

        {/* Estrelas do modo noite */}
        {modoNoite && (
          <div className="ceu-estrelas" aria-hidden="true">
            {estrelas.map((estrela) => (
              <span
                key={estrela.id}
                className="estrela"
                style={{
                  left: estrela.esquerda,
                  top: estrela.topo,
                  width: estrela.tamanho,
                  height: estrela.tamanho,
                  animationDelay: estrela.atraso,
                }}
              />
            ))}
          </div>
        )}

        {/* Nuvens decorativas */}
        <div className="ceu-nuvens" aria-hidden="true">
          <div className="nuvem nuvem-1" />
          <div className="nuvem nuvem-2" />
          <div className="nuvem nuvem-3" />
          <div className="nuvem nuvem-4" />
          <div className="nuvem nuvem-5" />
          <div className="nuvem nuvem-6" />
        </div>

        {/* Easter egg do Luffy */}
        {mostrarLuffy && (
          <img
            src={luffySkypiea}
            alt=""
            className="luffy-easter-egg"
          />
        )}

        {/* Título principal */}
        <header className="home-titulo">
          <span>THE DEVELOPER'S GRAND LINE</span>
          <h1>Minha jornada começa aqui</h1>
          <p>Explore as ilhas e descubra meus projetos.</p>
        </header>

        {/* Navegação pelas ilhas */}
        <nav
          className="navegacao-ilhas"
          aria-label="Escolha uma ilha para navegar"
        >
          {destinos.map((destino) => (
            <Link
              key={destino.classe}
              to={destino.rota}
              className={`placa-ilha placa-${destino.classe}`}
            >
              <strong>{destino.nome}</strong>
              <span>{destino.ilha}</span>
            </Link>
          ))}
        </nav>

        {/* Créditos do Going Merry */}
        <p className="credito-modelo">
          Going Merry 3D por{" "}
          <a
            href="https://sketchfab.com/3d-models/going-merry-one-piece-8cf214627e02411387d4df4b815ef28d"
            target="_blank"
            rel="noopener noreferrer"
          >
            RadhruinT
          </a>
          {" "}— CC BY 4.0. Adaptação de escala e animação.
        </p>
      </main>

      {/* Projetos selecionados no dashboard */}
      <section className="home-destaques">
        <div className="home-destaques-container">
          <header className="home-destaques-cabecalho">
            <span>EGGHEAD — PROJETOS SELECIONADOS</span>
            <h2>Os tesouros da minha jornada</h2>
            <p>
              Conheça algumas das minhas criações
              ao longo da Grand Line.
            </p>
          </header>

          {carregando && (
            <p className="home-destaques-status" role="status">
              Carregando projetos...
            </p>
          )}

          {erro && (
            <p className="home-destaques-status" role="alert">
              {erro}
            </p>
          )}

          {!carregando && !erro && destaques.length === 0 && (
            <p className="home-destaques-status">
              Nenhum projeto em destaque disponível.
            </p>
          )}

          {!carregando && !erro && destaques.length > 0 && (
            <div className="home-destaques-grid">
              {destaques.map((projeto, indice) => (
                <article
                  className="home-destaque-card"
                  key={projeto.id}
                >
                  <span className="home-destaque-numero">
                    PROJETO 0{indice + 1}
                  </span>

                  <h3>{projeto.name}</h3>

                  <p>
                    {projeto.description ||
                      "Explore este projeto e descubra mais sobre seu desenvolvimento."}
                  </p>

                  <span className="home-destaque-linguagem">
                    {projeto.language || "Projeto GitHub"}
                  </span>

                  <Link
                    to={`/projetos/${encodeURIComponent(projeto.name)}`}
                    className="home-destaque-link"
                  >
                    Explorar projeto →
                  </Link>
                </article>
              ))}
            </div>
          )}

          <Link
            to="/projetos"
            className="home-todos-projetos"
          >
            Ver todos os projetos →
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
