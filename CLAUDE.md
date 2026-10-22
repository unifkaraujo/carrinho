# Meu Mercado

App Android de lista de compras com foco em **captura rápida**: adicionar itens sem abrir o app (widget, voz, atalhos) e gerenciar a lista dentro do app.

Idioma do projeto: código em inglês, textos de UI e documentação em português.

## Princípios de código (obrigatórios)

- Clean code, **sem comentários** no código.
- Cada função faz uma coisa só; cada arquivo tem uma única responsabilidade.
- Arquitetura **feature-based**; dentro da feature, camadas separadas (`domain`, `data`, `use-cases`, `http` / `hooks`, `components`, `screens`).
- `domain` é puro (sem I/O); I/O fica em `data`; orquestração em `use-cases`; bordas em `http` (API) e `components`/`screens` (app).
- Nomes de arquivo em kebab-case; um export principal por arquivo.
- TypeScript strict em tudo. Regras de domínio sempre com testes (Vitest).
- Implementar **uma etapa do roadmap por vez**.

## Stack

| Camada     | Escolha                                                     |
| ---------- | ----------------------------------------------------------- |
| API        | Cloudflare Workers + Hono + Zod                             |
| Banco      | Cloudflare D1 (SQLite)                                      |
| Auth       | Better Auth (email/senha) dentro da API                     |
| App        | Expo (dev build, só Android) + expo-router + TanStack Query |
| Voz no app | expo-speech-recognition                                     |
| Widget     | react-native-android-widget                                 |
| Offline    | TanStack Query (cache persistido + fila de mutations)       |
| Monorepo   | npm workspaces                                              |

Motivos: Workers é grátis, sem cold start e sem cartão; Firebase Functions exige plano Blaze; Render/Railway free dormem (ruim para voz); Supabase free pausa por inatividade.

## Estrutura

```
apps/
  api/src/
    features/<feature>/{domain,data,use-cases,http}
    shared/http/
    index.ts
  mobile/src/
    app/                       (expo-router, telas finas)
    features/<feature>/{domain,data,hooks,components,screens}
    shared/{http,config,ui}
packages/
  shared/src/                  (regras de domínio usadas no app e na API)
```

Features da API: `auth`, `capture-tokens`, `items`, `categories`, `capture`.
Features do app: `auth`, `shopping-list`, `categories`, `quick-capture` (`voice/`, `widget/`, `shortcuts/`), `settings`.

## Decisões de domínio

- **Multiusuário**: todo dado pertence a um `user_id`. Compartilhar lista no futuro = migrar para `list_id` + `list_members`.
- **Credenciais**:
  - Sessão do app (Better Auth) — usada pelo app, widget e captura por voz (guardada em `expo-secure-store`).
  - Token de captura pessoal — para atalhos externos (HTTP Shortcuts, futuramente Assistant). Banco guarda só o hash.
- **Endpoints**:
  - `POST /capture { text }` — texto livre ("2 dúzias de ovos"); a API interpreta quantidade/unidade e aplica a dedup. Entrada universal para atalhos.
  - `GET /items`, `POST /items`, `PATCH /items/:id`, `DELETE /items/:id`, `DELETE /items/bought` — CRUD do app.
- **Item**: `name`, `quantity` (número, padrão 1), `unit` (opcional, texto livre), `category_id` (opcional, categorias por usuário), `status` (`pending` | `bought`).
- **Duplicatas**: `normalized_name` = trim + minúsculas + sem acento + singular (heurística pt-BR com lista de exceções). Único por usuário.
  - Captura sem quantidade explícita ("ovos") tem `quantity: null` → nunca sobrescreve a quantidade existente.
  - Existe pendente → atualiza quantidade/unidade se uma nova foi informada e mudou.
  - Existe comprado → volta para pendente (com a nova quantidade, ou mantém a anterior).
  - Unidade só é reconhecida após uma quantidade ("saco de lixo" é nome; "2 sacos de lixo" é 2 saco + "lixo").
  - Nome e categoria do item existente são preservados.
- **Mensagens de captura** usam forma neutra ("Adicionado: ovos") para evitar concordância de gênero.
- **Comprados**: seção própria, com ação "limpar comprados".
- **Offline**: app funciona offline; mutations ficam em fila e sincronizam ao voltar a rede. Servidor é a fonte da verdade.
- **Distribuição**: APK interno por enquanto. App Actions / "Ok Google" só após publicar na Play Store.

## Modelo de dados

```
user, session, account      (Better Auth)
categories      id, user_id, name
items           id, user_id, name, normalized_name, quantity, unit,
                category_id, status, bought_at, created_at, updated_at
                UNIQUE(user_id, normalized_name)
capture_tokens  id, user_id, token_hash, label, last_used_at, created_at
```

## Roadmap (MVP)

Progresso visual em `roadmap.html`.

0. Setup do monorepo, CLAUDE.md, TS strict, ESLint/Prettier, Vitest
1. Domínio compartilhado: `normalizeItemName` + `parseCaptureText` com testes
2. API mínima no ar: D1 + `POST /capture` + `GET /items` com token de captura via script
3. Validação real com HTTP Shortcuts (widget + voz chamando `/capture`)
4. Auth: Better Auth na API + login/cadastro no app
5. Lista no app: pendentes por categoria, comprar, remover, comprados + limpar
6. Adicionar no app: texto + voz, editar quantidade/unidade/categoria
7. Offline: cache persistido + fila de mutations
8. Captura nativa: widget com microfone + tela transparente + atalhos do ícone
9. Gerenciar tokens de captura no app
10. (Pós-publicação) App Actions / Gemini

## Comandos

- `npm install` — instala todos os workspaces
- `npm run typecheck` — checa tipos em todos os workspaces
- `npm run lint` / `npm run format`
- `npm test` — testes de todos os workspaces

API (`apps/api`):

- `npm run dev` — API local em `http://localhost:8787` (D1 local)
- `npm run db:generate` — gera migration a partir das tabelas Drizzle (`src/shared/db/schema.ts`)
- `npm run db:migrate:local` / `npm run db:migrate:remote`
- `npm run token:create -- --email <email> [--label <nome>] [--remote]` — cria usuário (se não existir) e token de captura
- `npm run deploy`

## Notas técnicas

- API em produção: `https://meu-mercado-api.meu-mercado-api.workers.dev` (D1 `meu-mercado`, região ENAM).

- TypeScript fixado em 6.x: typescript-eslint e Expo ainda não suportam TS 7.
- Banco via Drizzle ORM; colunas em snake_case, campos TS em camelCase. A tabela `user` segue o schema do Better Auth.
- Use-cases recebem repositórios por interface (`domain/*-repository.ts`); implementações D1 em `data/`, fakes em memória em `testing/`.
- Testes de API com curl no Git Bash corrompem acentos; use um script Node (`fetch`) para testar payloads com UTF-8.
