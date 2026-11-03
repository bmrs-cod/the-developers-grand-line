
# THE DEVELOPER'S GRAND LINE

### Portfólio interativo inspirado em One Piece

Projeto individual desenvolvido para o Checkpoint 3 — Portfolio, Stack e Harness Engineering, da disciplina de desenvolvimento web da FIAP.

O objetivo é apresentar meus projetos, minhas habilidades e minhas informações de contato por meio de uma experiência interativa, responsiva e inspirada no universo de One Piece.

A navegação principal acontece em um oceano tridimensional, no qual o Going Merry está acompanhado de três ilhas que representam as páginas do portfólio.

## Tecnologias utilizadas

### Front-end
- React 19
- Vite 8
- JavaScript
- HTML5 e CSS3
- React Router DOM

### Experiência 3D
- Three.js
- React Three Fiber
- React Three Drei
- GLTFLoader
- Modelo 3D otimizado em GLB

### Back-end e integrações
- Supabase Authentication
- Supabase PostgreSQL
- Supabase Edge Functions
- API REST do GitHub
- Resend API para notificações por e-mail

### Qualidade e testes
- Vitest
- React Testing Library
- ESLint
- Lighthouse

### Publicação
- GitHub para versionamento
- Vercel para hospedagem

## Conceito visual

O portfólio utiliza uma temática inspirada em One Piece, relacionando diferentes locais da obra às funcionalidades do site.

| Local | Funcionalidade |
|---|---|
| Vila Foosha | Página inicial |
| Egghead | Projetos do GitHub |
| Marineford | Formulário de contato |
| Quartel-General | Dashboard administrativo |

A página inicial apresenta o Going Merry em um oceano tridimensional, com ilhas, nuvens, ondas animadas e navegação interativa.

O visitante também pode alternar entre os modos dia e noite.

No modo noite, o cenário apresenta céu escuro, estrelas, oceano noturno e iluminação especial no navio.

Existe ainda um easter egg inspirado em Skypiea que aparece após 30 segundos na página inicial.

## Funcionalidades

### 1. Navegação com React Router

O site utiliza navegação client-side, com as seguintes rotas:

- `/` — Página inicial.
- `/projetos` — Lista de projetos.
- `/projetos/:nome` — Detalhes de um projeto.
- `/contato` — Formulário de contato.
- `/login` — Autenticação administrativa.
- `/recuperar-senha` — Recuperação de senha.
- `/dashboard` — Área administrativa protegida.

Também existe uma página para rotas não encontradas.

### 2. Integração com GitHub

Os projetos são carregados automaticamente pela API pública do GitHub.

O sistema permite:

- Listar repositórios públicos.
- Exibir nome, descrição e linguagem.
- Filtrar projetos por linguagem.
- Consultar detalhes de um repositório.
- Acessar o repositório original no GitHub.
- Tratar situações de carregamento, erro e ausência de resultados.

Usuário consultado na API: `bmrs-cod`.

### 3. Formulário de contato

O formulário de Marineford permite enviar mensagens diretamente ao responsável pelo portfólio.

Campos:

- Nome.
- E-mail.
- Mensagem.

As informações são validadas antes do envio.

A mensagem é processada por uma Supabase Edge Function, que:

1. Valida os dados recebidos.
2. Verifica o limite de envios.
3. Salva a mensagem no PostgreSQL.
4. Envia uma notificação por e-mail utilizando o Resend.
5. Retorna uma resposta de sucesso ou erro.

O formulário também bloqueia o botão enquanto a solicitação está sendo processada.

### 4. Proteção contra spam

O servidor implementa uma limitação de até três envios por endereço IP em cada janela de 15 minutos.

O identificador do visitante é protegido por HMAC-SHA256 antes de ser registrado na tabela de controle.

Quando o limite é atingido, a Edge Function retorna HTTP 429.

Essa proteção reduz envios excessivos, mas não substitui mecanismos adicionais contra bots.

### 5. Autenticação

A autenticação utiliza Supabase Auth.

O usuário administrador pode:

- Entrar com e-mail e senha.
- Recuperar sua senha.
- Acessar a área administrativa.
- Encerrar sua sessão.

A rota do dashboard verifica a autenticação antes de liberar o acesso.

As permissões de leitura e modificação dos dados administrativos são controladas também pelas políticas de Row Level Security (RLS) do Supabase.

### 6. Dashboard administrativo

O Quartel-General permite gerenciar as mensagens recebidas e os projetos destacados.

Funcionalidades:

- Visualizar mensagens do formulário.
- Identificar mensagens pendentes e respondidas.
- Marcar mensagens como respondidas.
- Retornar mensagens ao status pendente.
- Visualizar repositórios do GitHub.
- Selecionar até três projetos em destaque.
- Salvar a seleção no Supabase.

Os projetos selecionados são apresentados automaticamente na página inicial.

### 7. Tema dia e noite

O visitante pode alternar entre os temas claro e escuro.

A preferência é salva no `localStorage`, permanecendo após atualizar a página.

O modo noite também altera a iluminação e a aparência do cenário tridimensional.

### 8. Responsividade e acessibilidade

O projeto utiliza layouts responsivos, navegação semântica e elementos acessíveis.

Entre os recursos implementados estão:

- Labels nos campos de formulário.
- Mensagens de validação.
- Estados de carregamento.
- Feedback de sucesso e erro.
- Identificação de botões interativos.
- Navegação adaptada a diferentes tamanhos de tela.

## Estrutura do projeto

```text
portfolio-cp3/
├── public/
│   └── models/
│       └── going-merry/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Cena3D.jsx
│   │   ├── Navio3D.jsx
│   │   ├── Oceano3D.jsx
│   │   ├── OndasVisuais.jsx
│   │   ├── Nuvens3D.jsx
│   │   ├── Ilha3D.jsx
│   │   └── RotaProtegida.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Projetos.jsx
│   │   ├── ProjetoDetalhes.jsx
│   │   ├── Contato.jsx
│   │   ├── Login.jsx
│   │   ├── RecuperarSenha.jsx
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   ├── githubService.js
│   │   ├── supabaseClient.js
│   │   ├── mensagensService.js
│   │   └── destaquesService.js
│   ├── utils/
│   │   ├── validarFormulario.js
│   │   └── validarFormulario.test.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

A estrutura separa páginas, componentes reutilizáveis, serviços de integração e funções auxiliares.

## Instalação

### Pré-requisitos

- Node.js compatível com a versão do Vite utilizada.
- npm.
- Git.
- Projeto Supabase configurado para as funcionalidades de autenticação e contato.

### 1. Clonar o projeto

```bash
git clone URL_DO_REPOSITORIO
cd portfolio-cp3
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=URL_DO_PROJETO_SUPABASE
VITE_SUPABASE_PUBLISHABLE_KEY=CHAVE_PUBLICAVEL_SUPABASE
```

Essas variáveis permitem que o front-end se conecte ao Supabase.

As chaves privadas devem permanecer exclusivamente no servidor, nunca no código React.

### 4. Iniciar o projeto

```bash
npm run dev
```

### 5. Gerar a versão de produção

```bash
npm run build
```

### 6. Visualizar a versão de produção

```bash
npm run preview
```

## Configuração do back-end

O projeto utiliza a Edge Function `enviar-contato`.

Ela depende de configurações privadas no Supabase:

- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `RESEND_FROM_EMAIL`
- `CONTACT_RATE_SALT`

A função também utiliza as credenciais do próprio ambiente Supabase para acessar o banco de dados.

As tabelas utilizadas incluem:

- `mensagens`: armazena mensagens recebidas e seu status.
- `projetos_destaque`: armazena os repositórios destacados.
- `contato_limites`: controla o limite de envios.

O banco utiliza políticas de RLS para restringir operações administrativas.

Para executar todas as integrações em outro ambiente, é necessário configurar as tabelas, políticas, funções SQL, autenticação e segredos correspondentes.

## Testes automatizados

O projeto utiliza Vitest e React Testing Library.

Para executar os testes:

```bash
npm test
```

Para executar em modo de observação:

```bash
npm run test:watch
```

### Testes implementados

Validação do formulário:

1. Rejeitar campos vazios.
2. Rejeitar e-mail inválido.
3. Rejeitar mensagens muito curtas.
4. Aceitar dados válidos.

Proteção do dashboard:

5. Redirecionar visitantes não autenticados.
6. Permitir acesso de usuários autenticados.

Resultado verificado durante o desenvolvimento:

**6 testes aprovados em 2 arquivos de teste.**

Os testes de autenticação utilizam simulações do Supabase, sem depender de uma conexão real com o serviço.

## Desempenho e otimizações

O projeto utiliza diferentes estratégias para melhorar o desempenho:

- Carregamento de páginas sob demanda com React.lazy.
- Separação do código da cena 3D.
- Carregamento adiado do cenário tridimensional.
- Reutilização de geometrias e materiais.
- Otimização do modelo Going Merry.
- Build de produção com Vite.

### Otimização do Going Merry

O modelo original foi convertido para uma versão GLB com texturas WebP utilizando glTF Transform.

O tamanho passou de aproximadamente 6,54 MB para 1,35 MB, representando uma redução próxima de 79%.

A versão otimizada mantém a aparência e a interação do navio.

### Lighthouse

Uma medição local do Lighthouse Mobile, realizada na versão de produção do Vite, apresentou:

| Categoria | Pontuação |
|---|---:|
| Performance | 81 |
| Acessibilidade | 95 |
| Boas práticas | 100 |
| SEO | 82 |

A medição de Performance atingiu a meta de 80 pontos.

Os resultados do Lighthouse podem variar conforme o dispositivo, o ambiente e as condições da medição.

## Uso de inteligência artificial e Harness Engineering

Ferramentas de inteligência artificial foram utilizadas como apoio durante o planejamento, implementação, depuração e revisão do projeto.

### Atividades apoiadas por IA

- Planejamento da arquitetura React.
- Organização dos componentes e serviços.
- Desenvolvimento e refinamento do cenário 3D.
- Implementação de integrações com Supabase.
- Tratamento de erros do formulário.
- Criação de testes automatizados.
- Diagnóstico de problemas de execução.
- Análise de resultados do Lighthouse.
- Otimização e documentação do projeto.

### Processo de desenvolvimento

O trabalho foi desenvolvido de forma iterativa:

1. Definição dos requisitos.
2. Implementação de funcionalidades.
3. Testes locais.
4. Identificação de erros.
5. Correção e refinamento.
6. Verificação de integração e desempenho.

As sugestões produzidas por IA foram avaliadas e ajustadas durante o desenvolvimento.

A validação incluiu testes automatizados, testes manuais, execução do build de produção e análise do Lighthouse.

### Decisões técnicas

O projeto utiliza React e Vite pela simplicidade de configuração e organização.

O Three.js foi escolhido para construir uma experiência interativa inspirada em One Piece.

O Supabase fornece autenticação, banco de dados e funções de servidor.

O Resend foi utilizado para entregar notificações por e-mail.

A API pública do GitHub permite atualizar os projetos sem cadastrar manualmente cada repositório.

O principal desafio técnico foi equilibrar a experiência visual tridimensional com o desempenho em dispositivos móveis.

## Segurança

- Senhas são gerenciadas pelo Supabase Auth.
- O dashboard possui proteção de rota.
- O banco utiliza RLS para restringir acesso aos dados.
- Credenciais privadas não devem ser incluídas no repositório.
- O formulário possui validação no cliente e no servidor.
- A Edge Function utiliza controle de origem e limite de envios.
- O projeto utiliza variáveis de ambiente para configuração.

O arquivo `.env` deve permanecer fora do versionamento.

## Créditos

### Modelo 3D do Going Merry

Modelo original: RadhruinT  
Fonte: https://sketchfab.com/3d-models/going-merry-one-piece-8cf214627e02411387d4df4b815ef28d

Licença: Creative Commons Attribution 4.0 (CC BY 4.0).

O modelo foi adaptado em escala, animação e formato de arquivo para utilização no projeto.

### Inspiração visual

One Piece, obra criada por Eiichiro Oda.

Este portfólio é um projeto acadêmico independente, sem vínculo oficial com os responsáveis pela franquia.

## Links do projeto

- GitHub: https://github.com/bmrs-cod/the-developers-grand-line
- Site publicado: https://the-developers-grand-line-43e3.vercel.app
- Documentação do Harness: [docs/HARNESS.md](docs/HARNESS.md)
RM: 569785  
