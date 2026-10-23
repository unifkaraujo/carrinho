import { AuthError } from './auth-error';

const MESSAGES: Readonly<Record<string, string>> = {
  INVALID_EMAIL_OR_PASSWORD: 'E-mail ou senha incorretos.',
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'Já existe uma conta com este e-mail.',
  USER_ALREADY_EXISTS: 'Já existe uma conta com este e-mail.',
  PASSWORD_TOO_SHORT: 'A senha precisa ter pelo menos 8 caracteres.',
  INVALID_EMAIL: 'E-mail inválido.',
  INVALID_PASSWORD: 'Senha atual incorreta.',
  SERVER_ERROR: 'O servidor não conseguiu concluir. Tente novamente em instantes.',
};

const FALLBACK_MESSAGE = 'Não foi possível conectar. Verifique a internet e tente novamente.';

export const describeAuthError = (error: unknown): string =>
  (error instanceof AuthError && error.code && MESSAGES[error.code]) || FALLBACK_MESSAGE;
