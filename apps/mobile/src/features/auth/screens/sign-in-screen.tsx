import { Heading } from '../../../shared/ui/heading';
import { ScrollScreen } from '../../../shared/ui/scroll-screen';
import { TextLink } from '../../../shared/ui/text-link';
import { SignInForm } from '../components/sign-in-form';

export const SignInScreen = () => (
  <ScrollScreen>
    <Heading title="Meu Mercado" subtitle="Entre para ver sua lista de compras." />
    <SignInForm />
    <TextLink href="/sign-up" prefix="Não tem conta?" label="Criar conta" />
  </ScrollScreen>
);
