
# Harness Engineering — THE DEVELOPER'S GRAND LINE

## Objetivo

Registrar o processo de desenvolvimento assistido por inteligência artificial, incluindo decisões técnicas, validações e melhorias realizadas no portfólio.

## Ferramentas e tecnologias

- ChatGPT como apoio ao desenvolvimento.
- VS Code como ambiente de programação.
- React e Vite no front-end.
- Three.js e React Three Fiber na experiência 3D.
- Supabase para autenticação e banco de dados.
- Resend para notificações.
- GitHub e Vercel para versionamento e publicação.

## Metodologia

O projeto foi construído de forma iterativa, dividindo funcionalidades em etapas menores.

Para cada etapa, o processo envolveu:

1. Definição do comportamento esperado.
2. Implementação com apoio de IA.
3. Execução e teste no navegador.
4. Identificação de problemas.
5. Ajustes no código.
6. Nova validação.

## Principais desafios

### Cenário 3D

O desafio foi implementar um oceano navegável visualmente, com o Going Merry, ilhas, ondas e diferentes condições de iluminação.

Foram realizados ajustes de posição, escala, câmera, materiais e interações.

### Integração com Supabase

A autenticação, o dashboard e o formulário exigiram integração entre front-end, banco de dados e funções de servidor.

Foram testados fluxos de login, recuperação de senha, mensagens e projetos em destaque.

### Segurança

O formulário recebeu validação de dados e limitação de envios.

O acesso administrativo utiliza autenticação e políticas de segurança no banco de dados.

As credenciais privadas devem permanecer fora do código público.

### Desempenho

O Lighthouse identificou custos elevados relacionados ao JavaScript e ao cenário tridimensional.

Foram aplicadas otimizações, incluindo:

- Carregamento sob demanda.
- Reutilização de geometrias e materiais.
- Conversão do Going Merry para GLB com texturas otimizadas.
- Ajustes na renderização do cenário.

O modelo 3D passou de aproximadamente 6,54 MB para 1,35 MB.

Uma medição final do Lighthouse Mobile atingiu 81 pontos de Performance.

## Testes e validações

Foram implementados seis testes automatizados com Vitest e React Testing Library.

Também foram realizados testes manuais de:

- Navegação entre páginas.
- Autenticação.
- Dashboard administrativo.
- Formulário de contato.
- Integração com GitHub.
- Responsividade.
- Publicação na Vercel.

## Decisões e trade-offs

O uso de gráficos 3D aumenta o custo de processamento, mas foi mantido por ser parte central da identidade do portfólio.

Como compensação, o projeto utiliza carregamento separado do cenário e recursos gráficos otimizados.

A API pública do GitHub evita o cadastro manual de repositórios, mas depende da disponibilidade de um serviço externo.

O Supabase simplifica autenticação e persistência, mas exige configuração de ambiente, políticas de acesso e funções de servidor.

## Papel da inteligência artificial

A IA apoiou o planejamento, a implementação, a depuração e a documentação.

As respostas foram utilizadas como sugestões de implementação, não como garantia de funcionamento.

A validação ocorreu por meio de execução local, testes automatizados, inspeção visual, build de produção e testes no site publicado.

Este documento resume o processo realizado; não representa uma transcrição literal de todos os prompts utilizados.

## Resultado

O portfólio foi publicado com navegação 3D, projetos integrados ao GitHub, autenticação administrativa, dashboard e formulário funcional.

Repositório:
https://github.com/bmrs-cod/the-developers-grand-line

Site:
https://the-developers-grand-line-43e3.vercel.app
