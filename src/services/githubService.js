
const GITHUB_USER = "bmrs-cod";

export async function buscarProjetos() {
  const resposta = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`
  );

  if (!resposta.ok) {
    throw new Error("Erro ao carregar projetos do GitHub");
  }

  const projetos = await resposta.json();

  return projetos.filter((projeto) => !projeto.fork);
}

export async function buscarProjeto(nome) {
  const resposta = await fetch(
    `https://api.github.com/repos/bmrs-cod/${encodeURIComponent(nome)}`
  );

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar o projeto.");
  }

  return resposta.json();
}
