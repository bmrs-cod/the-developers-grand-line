
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function entrar(evento) {
    evento.preventDefault();

    if (carregando) return;

    setCarregando(true);
    setErro("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        setErro(error.message);
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch {
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-pagina">
      <div className="login-container">
        <div className="login-emblema">
          ⚓
        </div>

        <span className="login-etiqueta">
          MARINEFORD — ACESSO RESTRITO
        </span>

        <h1>Acesso ao Quartel-General</h1>

        <p className="login-descricao">
          Área exclusiva do administrador do portfólio.
        </p>

        <form className="login-formulario" onSubmit={entrar}>
          <div className="login-campo">
            <label htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-campo">
            <label htmlFor="login-senha">Senha</label>
            <input
              id="login-senha"
              type="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <Link to="/recuperar-senha" className="login-recuperar">
            Esqueceu sua senha?
          </Link>

          <button
            type="submit"
            className="login-botao"
            disabled={carregando}
          >
            {carregando ? "Autenticando..." : "Entrar no Quartel-General"}
          </button>

          {erro && (
            <p className="login-erro" role="alert">
              {erro}
            </p>
          )}
        </form>

        <Link to="/" className="login-voltar">
          ← Retornar para a Grand Line
        </Link>
      </div>
    </main>
  );
}

export default Login;
