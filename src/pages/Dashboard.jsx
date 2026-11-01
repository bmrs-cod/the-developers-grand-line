
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import {
  buscarMensagens,
  marcarRespondida,
} from "../services/mensagensService";
import { buscarProjetos } from "../services/githubService";
import {
  buscarDestaques,
  salvarDestaques,
} from "../services/destaquesService";

function Dashboard() {
  const navigate = useNavigate();

  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [atualizandoId, setAtualizandoId] = useState(null);

  const [projetos, setProjetos] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [carregandoProjetos, setCarregandoProjetos] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroProjetos, setErroProjetos] = useState("");
  const [feedbackProjetos, setFeedbackProjetos] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        const dados = await buscarMensagens();
        if (ativo) setMensagens(dados);
      } catch {
        if (ativo) {
          setErro("Não foi possível carregar as mensagens.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    async function carregarProjetos() {
      try {
        const [repositorios, destaques] = await Promise.all([
          buscarProjetos(),
          buscarDestaques(),
        ]);

        if (ativo) {
          setProjetos(repositorios);
          setSelecionados(destaques);
        }
      } catch {
        if (ativo) {
          setErroProjetos("Não foi possível carregar os projetos.");
        }
      } finally {
        if (ativo) setCarregandoProjetos(false);
      }
    }

    carregarDados();
    carregarProjetos();

    return () => {
      ativo = false;
    };
  }, []);

  async function alterarStatus(mensagem) {
    setAtualizandoId(mensagem.id);
    setErro("");

    try {
      const resultado = await marcarRespondida(
        mensagem.id,
        !mensagem.respondida
      );

      if (!resultado.length) {
        throw new Error("Mensagem não atualizada");
      }

      setMensagens((anteriores) =>
        anteriores.map((item) =>
          item.id === mensagem.id ? resultado[0] : item
        )
      );
    } catch {
      setErro("Não foi possível atualizar a mensagem.");
    } finally {
      setAtualizandoId(null);
    }
  }

  function alternarDestaque(nome) {
    setFeedbackProjetos("");
    setErroProjetos("");

    if (selecionados.includes(nome)) {
      setSelecionados((anteriores) =>
        anteriores.filter((item) => item !== nome)
      );
      return;
    }

    if (selecionados.length >= 3) {
      setErroProjetos("Você pode selecionar até 3 projetos.");
      return;
    }

    setSelecionados((anteriores) => [...anteriores, nome]);
  }


async function guardarDestaques() {
  if (salvando) return;

  setSalvando(true);
  setErroProjetos("");
  setFeedbackProjetos("");

  try {
    await salvarDestaques(selecionados);

    const destaquesSalvos = await buscarDestaques();

    setSelecionados(destaquesSalvos);
    setFeedbackProjetos("Projetos em destaque salvos!");
  } catch (erro) {
    console.error("Erro ao salvar destaques:", erro);

    setErroProjetos(
      erro.message || "Não foi possível salvar os destaques."
    );
  } finally {
    setSalvando(false);
  }
}


  async function sair() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setErro("Não foi possível sair da conta.");
      return;
    }

    navigate("/login", { replace: true });
  }

  return (
    <main className="dashboard-pagina">
      <nav className="dashboard-navegacao">
        <Link to="/">Retornar para a Grand Line</Link>
        <button onClick={sair}>Sair da conta</button>
      </nav>

      <header className="dashboard-cabecalho">
        <span>MARINEFORD — ACESSO ADMINISTRATIVO</span>
        <h1>Quartel-General</h1>
        <p>
          Gerenciamento das mensagens e dos projetos
          em destaque do portfólio.
        </p>
      </header>

      <section className="dashboard-paineis">
        <article>
          <h2>Mensagens recebidas</h2>

          {carregando && <p>Carregando mensagens...</p>}

          {erro && <p role="alert">{erro}</p>}

          {!carregando && !erro && mensagens.length === 0 && (
            <p>Nenhuma transmissão recebida ainda.</p>
          )}

          {!carregando &&
            mensagens.map((mensagem) => (
              <div
                className="dashboard-mensagem"
                key={mensagem.id}
              >
                <h3>{mensagem.nome}</h3>

                <p>
                  <strong>E-mail:</strong> {mensagem.email}
                </p>

                <p>{mensagem.mensagem}</p>

                <small>
                  Recebida em:{" "}
                  {new Date(
                    mensagem.created_at
                  ).toLocaleString("pt-BR")}
                </small>

                <p>
                  Status:{" "}
                  <strong>
                    {mensagem.respondida
                      ? "Respondida"
                      : "Pendente"}
                  </strong>
                </p>

                <button
                  className="dashboard-status-botao"
                  onClick={() => alterarStatus(mensagem)}
                  disabled={atualizandoId === mensagem.id}
                >
                  {atualizandoId === mensagem.id
                    ? "Salvando..."
                    : mensagem.respondida
                    ? "Marcar como pendente"
                    : "Marcar como respondida"}
                </button>
              </div>
            ))}
        </article>

        <article>
          <h2>Projetos em destaque</h2>

          <p>
            Selecione até 3 repositórios do GitHub que
            aparecerão em destaque na Home.
          </p>

          {carregandoProjetos && (
            <p>Carregando repositórios...</p>
          )}

          {erroProjetos && (
            <p role="alert">{erroProjetos}</p>
          )}

          {!carregandoProjetos && (
            <>
              <p>
                Selecionados:{" "}
                <strong>{selecionados.length}/3</strong>
              </p>

              {projetos.length === 0 && (
                <p>Nenhum repositório encontrado.</p>
              )}

              <div className="dashboard-projetos-lista">
                {projetos.map((projeto) => (
                  <label
                    className="dashboard-projeto-item"
                    key={projeto.id}
                  >
                    <input
                      type="checkbox"
                      checked={selecionados.includes(projeto.name)}
                      disabled={
                        salvando ||
                        (!selecionados.includes(projeto.name) &&
                          selecionados.length >= 3)
                      }
                      onChange={() =>
                        alternarDestaque(projeto.name)
                      }
                    />

                    <span>
                      <strong>{projeto.name}</strong>
                      <small>
                        {projeto.language || "Sem linguagem"}
                      </small>
                    </span>
                  </label>
                ))}
              </div>

              <button
                className="dashboard-status-botao"
                onClick={guardarDestaques}
                disabled={salvando}
              >
                {salvando
                  ? "Salvando..."
                  : "Salvar destaques"}
              </button>

              {feedbackProjetos && (
                <p role="status">{feedbackProjetos}</p>
              )}
            </>
          )}
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
