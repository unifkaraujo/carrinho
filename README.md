# Meu Mercado

Lista de compras Android com captura rápida: widget, voz e atalhos do ícone, sem precisar abrir a lista.

- `apps/api` — API (Cloudflare Workers + Hono + D1 + Better Auth), em produção em
  `https://meu-mercado-api.meu-mercado-api.workers.dev`
- `apps/mobile` — app Expo (Android)
- `packages/shared` — regras compartilhadas (normalização de nomes, leitura de "2 dúzias de ovos")

Decisões de arquitetura e convenções estão no [CLAUDE.md](CLAUDE.md).

## Instalar o app no celular

O app usa módulos nativos (voz, widget, atalhos), então **não roda no Expo Go**. Escolha um caminho:

### A) Gerar o APK neste computador (recomendado)

Precisa do Android SDK e JDK 17 (já instalados aqui).

```sh
cd apps/mobile
npx expo prebuild -p android --clean
cd android
./gradlew assembleRelease
```

O APK fica em `apps/mobile/android/app/build/outputs/apk/release/app-release.apk`.
Copie para o celular e instale (permita "instalar apps desconhecidos"), ou com o celular no USB:

```sh
adb install -r app/build/outputs/apk/release/app-release.apk
```

O APK de release é assinado com a chave de debug — serve para uso interno, não para a Play Store.

### B) Rodar em modo desenvolvimento (com recarga ao vivo)

Com o celular no USB e a depuração USB ativada:

```sh
cd apps/mobile
npx expo run:android
```

### C) Gerar na nuvem (EAS, plano grátis)

```sh
cd apps/mobile
npx eas-cli@latest login
npx eas-cli@latest build -p android --profile preview
```

## Primeiro uso

1. Abra o app e entre com seu e-mail. A senha temporária foi informada no chat; troque em
   **Configurações → Alterar senha**.
2. Adicione o widget: pressione e segure a tela inicial → **Widgets** → **Meu Mercado** →
   "Adicionar à lista". Ele tem os botões **🎤 Falar** e **✏️ Digitar**.
3. Pressione e segure o ícone do app para ver os atalhos **Adicionar por voz** e **Digitar item**.
4. Na primeira vez que usar a voz, permita o microfone.
5. O atalho do HTTP Shortcuts continua funcionando. Quando quiser trocar o token: **Configurações →
   Tokens de captura** (crie um novo, atualize o atalho e revogue o antigo).

## Desenvolvimento

```sh
npm install
npm run typecheck
npm run lint
npm test
```

API local: `cd apps/api && npm run db:migrate:local && npm run dev`.
Para o app apontar para a API local, crie `apps/mobile/.env` com
`EXPO_PUBLIC_API_URL=http://<ip-do-computador>:8787`.

## Limitações conhecidas

- **Widget/atalho abrem o app por um instante**: a captura aparece como um painel sobre um fundo
  escuro e o app fecha sozinho depois de salvar. Um painel flutuando direto sobre a tela inicial
  exigiria uma Activity nativa translúcida (possível melhoria futura).
- **Limite de CPU do Workers (plano grátis, 10 ms)**: o hash de senha usa PBKDF2 com 100 mil
  iterações (~30–60 ms). Se login/cadastro falharem em produção, veja `npx wrangler tail` em
  `apps/api`; se aparecer "exceeded CPU", reduza `PASSWORD_HASH_ITERATIONS` em
  `apps/api/wrangler.jsonc` (ex.: 20000), rode `npm run deploy` e redefina a senha com
  `npm run user:set-password -- --email <email> --remote`.
- **Itens adicionados offline** só podem ser editados depois de sincronizar.
- **"Ok Google"** (etapa 10) depende de publicar na Play Store.
