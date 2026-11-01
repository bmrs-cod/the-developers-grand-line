
export function validarFormulario(dados) {
  const erros = {};

  if (dados.nome.trim().length < 3) {
    erros.nome = "O nome deve ter pelo menos 3 caracteres.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email.trim())) {
    erros.email = "Digite um e-mail válido.";
  }

  if (dados.mensagem.trim().length < 20) {
    erros.mensagem = "A mensagem deve ter no mínimo 20 caracteres.";
  }

  return erros;
}
