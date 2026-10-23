import { ScrollScreen } from '../../../shared/ui/scroll-screen';
import { TextLink } from '../../../shared/ui/text-link';
import { AuthHeader } from '../components/auth-header';
import { SignUpForm } from '../components/sign-up-form';

export const SignUpScreen = () => (
  <ScrollScreen centered>
    <AuthHeader tagline="Crie sua conta. A lista fica salva e sincronizada." />
    <SignUpForm />
    <TextLink href="/sign-in" prefix="Já tem conta?" label="Entrar" />
  </ScrollScreen>
);
