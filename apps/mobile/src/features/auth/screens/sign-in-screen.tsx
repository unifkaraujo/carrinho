import { ScrollScreen } from '../../../shared/ui/scroll-screen';
import { TextLink } from '../../../shared/ui/text-link';
import { AuthHeader } from '../components/auth-header';
import { SignInForm } from '../components/sign-in-form';

export const SignInScreen = () => (
  <ScrollScreen centered>
    <AuthHeader tagline="Sua lista de compras, na hora que você lembrar." />
    <SignInForm />
    <TextLink href="/sign-up" prefix="Não tem conta?" label="Criar conta" />
  </ScrollScreen>
);
