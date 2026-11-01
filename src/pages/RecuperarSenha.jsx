
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [recuperacao, setRecuperacao] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    let ativo = true;

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((evento, sessao) => {
        if (evento === "PASSWORD_RECOVERY" && ativo) {
          setRecuperacao(true);
        }

        if (evento === "INITIAL_SESSION" && sessao && ativo) {
          setRecuperacao(true);
        }
      });

    return () => {
      ativo = false;
      subscription.unsubscribe();
    };
  }, []);

  async function solicitarLink(e) {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/recuperar-senha`,
    });

    setCarregando(false);

   
if (error) {
  console.error("Erro do Supabase:", error);
  setMensagem(`Erro: ${error.message}`);
} else {
  setMensagem(
    "Se o e-mail estiver cadastrado, você receberá um link de recuperação."
  );
}

  }

  async function alterarSenha(e) {
    e.preventDefault();
    setMensagem("");

    if (senha.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (senha !== confirmacao) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    setCarregando(true);

    const { error } = await supabase.auth.updateUser({
      password: senha,
    });

    if (error) {
      setMensagem("Não foi possível redefinir a senha: " + error.message);
    } else {
      await supabase.auth.signOut();
      setRecuperacao(false);
      setSenha("");
      setConfirmacao("");
      setMensagem("Senha alterada! Agora você pode fazer login.");
    }

    setCarregando(false);
  }

  return (
    <main className="login-pagina">
      <h1>Recuperação de acesso</h1>
      <p>Quartel-General de Marineford</p>

      {recuperacao ? (
        <form onSubmit={alterarSenha}>
          <h2>Definir nova senha</h2>

          <label htmlFor="nova-senha">Nova senha</label>
          <input
            id="nova-senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            minLength={8}
            required
          />

          <label htmlFor="confirmar-senha">Confirmar senha</label>
          <input
            id="confirmar-senha"
            type="password"
            value={confirmacao}
            onChange={(e) => setConfirmacao(e.target.value)}
            required
          />

          <button disabled={carregando}>
            {carregando ? "Salvando..." : "Alterar senha"}
          </button>
        </form>
      ) : (
        <form onSubmit={solicitarLink}>
          <h2>Solicitar recuperação</h2>

          <label htmlFor="email-recuperacao">E-mail</label>
          <input
            id="email-recuperacao"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button disabled={carregando}>
            {carregando ? "Enviando..." : "Enviar link"}
          </button>
        </form>
      )}

      {mensagem && <p role="status">{mensagem}</p>}

      <p>
        <Link to="/login">Voltar ao login</Link>
      </p>
    </main>
  );
}

export default RecuperarSenha;
