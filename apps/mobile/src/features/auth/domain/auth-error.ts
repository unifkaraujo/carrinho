export class AuthError extends Error {
  constructor(readonly code: string | undefined) {
    super(code ?? 'UNKNOWN');
    this.name = 'AuthError';
  }
}
