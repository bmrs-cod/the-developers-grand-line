
import { useState } from "react";
import { Link } from "react-router-dom";
import { validarFormulario } from "../utils/validarFormulario";

const formularioInicial = {
  nome: "",
  email: "",
  mensagem: "",
};

function Contato() {
  const [dados, setDados] = useState(formularioInicial);
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState("");

  function alterarCampo(evento) {
    const { name, value } = evento.target;

    setDados((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setErros((anterior) => ({
      ...anterior,
      [name]: "",
    }));

    setFeedback("");
  }

  async function enviarMensagem(evento) {
    evento.preventDefault();

    if (enviando) return;

    const novosErros = validarFormulario(dados);
    setErros(novosErros);
    setFeedback("");

    if (Object.keys(novosErros).length > 0) return;

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

    if (!supabaseUrl) {
      setFeedback("O serviço de envio ainda não está configurado.");
      return;
    }

    setEnviando(true);

    try {
      const resposta = await fetch(
        `${supabaseUrl}/functions/v1/enviar-contato`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: dados.nome.trim(),
            email: dados.email.trim(),
            mensagem: dados.mensagem.trim(),
          }),
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok || !resultado.sucesso) {
        if (resposta.status === 429) {
          throw new Error("Limite de envios");
        }

        throw new Error(
          resultado.erro || "Não foi possível enviar a mensagem."
        );
      }

      setDados(formularioInicial);
      setErros({});

      if (resultado.aviso) {
        setFeedback(
          "Transmissão registrada, mas houve um problema na notificação por e-mail."
        );
      } else {
        setFeedback("Transmissão enviada com sucesso!");
      }
    } catch (erro) {
      console.error("Erro no contato:", erro);

      if (erro.message.includes("Limite de envios")) {
        setFeedback(
          "Limite de transmissões atingido. Aguarde alguns minutos antes de tentar novamente."
        );
      } else {
        setFeedback(
          "Falha na transmissão. Tente novamente."
        );
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="marineford-pagina">
      <nav className="marineford-navegacao">
        <Link to="/">← Retornar para a Grand Line</Link>
        <Link to="/projetos">Explorar projetos →</Link>
      </nav>

      <header className="marineford-cabecalho">
        <span>MARINEFORD — QUARTEL-GENERAL DA MARINHA</span>
        <h1>Central de Comunicações</h1>
        <p>
          Estabeleça uma conexão direta e envie sua
          mensagem pela Grand Line.
        </p>
      </header>

      <section className="marineford-conteudo">
        <div className="marineford-informacoes">
          <div className="marineford-emblema" aria-hidden="true">
            <span>MARINE</span>
            <div className="marineford-ancora">⚓</div>
          </div>

          <span className="marineford-codigo">
            MARINE HQ — CANAL 001
          </span>

          <h2>Comunicação estabelecida</h2>

          <p>
            Toda grande jornada começa com uma conversa.
            Envie sua mensagem para compartilhar ideias,
            oportunidades ou propostas de colaboração.
          </p>

          <div className="marineford-radar" aria-hidden="true">
            <div className="radar-circulo radar-externo" />
            <div className="radar-circulo radar-medio" />
            <div className="radar-circulo radar-interno" />
            <div className="radar-linha radar-horizontal" />
            <div className="radar-linha radar-vertical" />
            <div className="radar-varredura" />
            <div className="radar-ponto" />
          </div>

          <div className="marineford-sinal">
            <span className="sinal-luz" />
            SISTEMA DE COMUNICAÇÃO DISPONÍVEL
          </div>
        </div>

        <form
          className="marineford-formulario"
          onSubmit={enviarMensagem}
          noValidate
        >
          <div className="marineford-formulario-topo">
            <span>TRANSMISSÃO 001</span>
            <span>CANAL DE CONTATO</span>
          </div>

          <h2>Enviar transmissão</h2>

          <div className="marineford-campo">
            <label htmlFor="nome">IDENTIFICAÇÃO</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Seu nome"
              autoComplete="name"
              value={dados.nome}
              onChange={alterarCampo}
              aria-invalid={Boolean(erros.nome)}
              aria-describedby={erros.nome ? "erro-nome" : undefined}
            />
            {erros.nome && (
              <small id="erro-nome" className="marineford-erro">
                {erros.nome}
              </small>
            )}
          </div>

          <div className="marineford-campo">
            <label htmlFor="email">FREQUÊNCIA DE RETORNO</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              autoComplete="email"
              value={dados.email}
              onChange={alterarCampo}
              aria-invalid={Boolean(erros.email)}
              aria-describedby={erros.email ? "erro-email" : undefined}
            />
            {erros.email && (
              <small id="erro-email" className="marineford-erro">
                {erros.email}
              </small>
            )}
          </div>

          <div className="marineford-campo">
            <label htmlFor="mensagem">
              CONTEÚDO DA TRANSMISSÃO
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows="6"
              placeholder="Escreva sua mensagem..."
              value={dados.mensagem}
              onChange={alterarCampo}
              aria-invalid={Boolean(erros.mensagem)}
              aria-describedby={
                erros.mensagem ? "erro-mensagem" : undefined
              }
            />
            {erros.mensagem && (
              <small id="erro-mensagem" className="marineford-erro">
                {erros.mensagem}
              </small>
            )}
          </div>

          <button
            className="marineford-enviar"
            type="submit"
            disabled={enviando}
          >
            {enviando
              ? "Transmitindo mensagem..."
              : "Enviar transmissão →"}
          </button>

          {feedback && (
            <p className="marineford-feedback" role="status">
              {feedback}
            </p>
          )}
        </form>
      </section>

      <footer className="marineford-rodape">
        GRAND LINE COMMUNICATION NETWORK — MARINEFORD HQ
      </footer>
    </main>
  );
}

export default Contato;
