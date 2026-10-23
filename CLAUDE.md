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
    shared/{config,form,http,query,storage,ui}
    bootstrap/                 (QueryClient, providers, integrações entre features)
  mobile/index.ts              (entry: expo-router + registro do widget)
packages/
  shared/src/                  (regras de domínio usadas no app e na API)
```

Features da API: `auth`, `capture-tokens`, `items`, `categories`, `capture`.
Features do app: `auth`, `shopping-list`, `categories`, `quick-capture` (`voice/`, `widget/`, `shortcuts/`), `capture-tokens`, `settings`.

## Decisões de domínio

- **Multiusuário**: todo dado pertence a um `user_id`. Compartilhar lista no futuro = migrar para `list_id` + `list_members`.
- **Credenciais**:
  - Sessão do app (Better Auth, plugin `bearer`) — usada pelo app, widget e captura por voz (guardada em `expo-secure-store`). O RN guarda cookies sozinho, então a API remove o header `Cookie` antes do Better Auth (`shared/http/strip-cookies.ts`); sem isso a checagem de Origin barra POSTs (sign-out, change-password) com 403.
  - Token de captura pessoal (prefixo `mm_`) — para atalhos externos. Banco guarda só o hash SHA-256.
  - `requireUser` aceita os dois; `requireSession` só sessão (usado em `/capture-tokens`).
- **Senhas**: PBKDF2-SHA256 via Web Crypto (hash próprio, não o scrypt padrão do Better Auth, por causa do limite de CPU do Workers). Iterações em `PASSWORD_HASH_ITERATIONS` (wrangler vars); o hash guarda as iterações usadas, então dá para mudar sem invalidar senhas.
- **Endpoints**:
  - `POST /capture { text }` — texto livre ("2 dúzias de ovos"); a API interpreta quantidade/unidade e aplica a dedup. Entrada universal para atalhos.
  - `GET /items?status=`, `PATCH /items/:id`, `DELETE /items/:id`, `DELETE /items/bought` — app (adicionar no app também usa `/capture`).
  - `GET/POST /categories`, `DELETE /categories/:id`. Categorias padrão criadas no cadastro (hook `databaseHooks.user.create.after`).
  - `GET/POST /capture-tokens`, `DELETE /capture-tokens/:id`.
  - `/api/auth/*` — Better Auth (sign-up/sign-in/sign-out/get-session/change-password).
- **Item**: `name`, `quantity` (número, padrão 1), `unit` (opcional, texto livre), `category_id` (opcional, categorias por usuário), `status` (`pending` | `bought`).
- **Duplicatas**: `normalized_name` = trim + minúsculas + sem acento + singular (heurística pt-BR com lista de exceções). Único por usuário.
  - Captura sem quantidade explícita ("ovos") tem `quantity: null` → nunca sobrescreve a quantidade existente.
  - Existe pendente → atualiza quantidade/unidade se uma nova foi informada e mudou.
  - Existe comprado → volta para pendente (com a nova quantidade, ou mantém a anterior).
  - Unidade só é reconhecida após uma quantidade ("saco de lixo" é nome; "2 sacos de lixo" é 2 saco + "lixo").
  - Nome e categoria do item existente são preservados.
- **Mensagens de captura** usam forma neutra ("Adicionado: ovos") para evitar concordância de gênero.
- **Comprados**: seção própria, com ação "limpar comprados".
- **Offline**: cache do TanStack Query persistido (AsyncStorage). Mutations usam `setMutationDefaults` com chaves fixas e `scope` `items` (execução em série), então ficam pausadas offline e são retomadas inclusive após reiniciar o app. Captura offline cria item local (`id` com prefixo `local-`) replicando a regra de duplicata; itens locais ficam bloqueados para edição até sincronizar. Servidor é a fonte da verdade.
- **Captura rápida**: widget (`QuickCapture`) e atalhos do ícone abrem `meumercado://capture?mode=voice|text&source=widget|shortcut`, uma tela modal transparente que salva e fecha o app (`BackHandler.exitApp`). O widget é um botão 1x1 "Comprar" que abre a captura por voz. Ao fechar, a captura volta para `/list` antes de sair, senão o próximo link cai na tela antiga.
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
- `npm run token:create -- --email <email> [--label <nome>] [--remote]` — cria token de captura para um usuário existente
- `npm run user:set-password -- --email <email> [--remote]` — define senha aleatória (imprime no terminal)
- `npm run deploy`

App (`apps/mobile`):

- `npx expo prebuild -p android --clean` e `cd android && ./gradlew assembleRelease` — APK em `android/app/build/outputs/apk/release/`
- `npx expo run:android` — dev build no celular conectado (USB)
- Expo Go **não** funciona (módulos nativos: voz, widget, atalhos)
- `npx vitest run` — testes de domínio (só arquivos sem React Native)

## Notas técnicas

- API em produção: `https://meu-mercado-api.meu-mercado-api.workers.dev` (D1 `meu-mercado`, região ENAM).

- TypeScript fixado em 6.x: typescript-eslint e Expo ainda não suportam TS 7.
- Banco via Drizzle ORM; colunas em snake_case, campos TS em camelCase. A tabela `user` segue o schema do Better Auth.
- Use-cases recebem repositórios por interface (`domain/*-repository.ts`); implementações D1 em `data/`, fakes em memória em `testing/`.
- Testes de API com curl no Git Bash corrompem acentos; use um script Node (`fetch`) para testar payloads com UTF-8.
- Better Auth exige `Origin` quando a requisição tem `Sec-Fetch-*` (o `fetch` do Node envia). Para simular o app, teste com curl.
- No ambiente do Claude Code a rede é restrita: não alcança `*.workers.dev` nem baixa o Gradle. Build do APK e testes em produção são feitos pelo usuário.
- React Compiler está ligado; componentes do widget (`react-native-android-widget`) precisam de `'use no memo'` no topo do arquivo.
- `patches/react-native-android-widget+0.24.0.patch` (aplicado no `postinstall`): `OPEN_URI` vira `PendingIntent.getActivity` em vez de broadcast + `startActivity`, que o Android bloqueia quando o app foi encerrado (abertura de tela a partir do segundo plano). Após um force-stop o primeiro toque ainda falha (o Android cancela os PendingIntents do app); o widget é redesenhado e o próximo toque funciona.
- Release Android sem R8 (`expo-build-properties`): o R8 removia classes do WorkManager usadas pelo widget.
- ESLint: máximo 30 linhas por função (60 em `.tsx` do app) e 3 parâmetros; regras de hooks do React no app.
