import { Heading } from '../../../shared/ui/heading';
import { ScrollScreen } from '../../../shared/ui/scroll-screen';
import { TextLink } from '../../../shared/ui/text-link';
import { SignUpForm } from '../components/sign-up-form';

export const SignUpScreen = () => (
  <ScrollScreen>
    <Heading title="Criar conta" subtitle="Sua lista fica salva e sincronizada." />
    <SignUpForm />
    <TextLink href="/sign-in" prefix="Já tem conta?" label="Entrar" />
  </ScrollScreen>
);
