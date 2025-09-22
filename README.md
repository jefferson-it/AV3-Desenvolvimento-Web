# Projeto AV3 - Desenvolvimento Web

## 📋 Sobre o Projeto

Equipe: Jefferson Silva, Otávio Neto, Railan Santos

O projeto é uma aplicação web desenvolvida como parte da avaliação da disciplina de Programação Web. Segundo o [repositório](https://github.com/prof-hfabio/AV3?tab=readme-ov-file#proposta-2) do professor, minha equipe escolheu a proposta 2, que diz:

```
Descrição: O aluno deverá criar uma aplicação de blog online O projeto deve conter:

Tela de login/registro (pode ser simplificada).
Criar, editar e excluir posts.
Comentar e interagir em posts de outros usuários
As páginas devem ser responsivas e funcionar corretamente em 2 tamanhos de tela (1920x1080 e 430x932)
Back-end implementado com NodeJS (pode utilizar uma solução leve como SQLite/MongoDB ou ainda implementar um banco de dados em memória).
Documentar o projeto em Markdown com instruções de instalação e uso
Critério de avaliação
A implementação de código, o system-design, A utilização de um framework de front-end (React, Vue ou Svelte) e a utilização de conteineres do docker (dockerfile e/ou docker-compose) serão considerados como pontuação extra.
```

## 🚀 Tecnologias Utilizadas

- **Front-end:** HTML5, CSS3, JavaScript
- **Back-end:** Node JS
- **Banco de Dados:** MongoDB

## 📁 Estrutura do Projeto

```
AV3-Desenvolvimento-Web/
├── server/
│ ├── @types/ # Definições de tipos (TypeScript)
│ ├── database/ # Conexão e scripts do banco de dados
│ ├── public/ # Arquivos públicos (CSS, JS, imagens)
│ ├── routers/ # Definição das rotas da aplicação
│ ├── utils/ # Funções utilitárias e arquivos de configuração
│ ├── Dockerfile # Instruções para build da imagem Docker
│ ├── package.json # Dependências e scripts do Node.js
│ └── server.js # Arquivo principal do servidor
│
├── .dockerignore # Arquivos ignorados pelo Docker
├── .gitignore # Arquivos ignorados pelo Git
├── docker-compose.yml # Orquestração de containers Docker
└── README.md # Informações do projeto
```