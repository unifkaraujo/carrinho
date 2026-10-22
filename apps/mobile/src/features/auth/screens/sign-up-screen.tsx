import { Heading } from '../../../shared/ui/heading';
import { Screen } from '../../../shared/ui/screen';
import { TextLink } from '../../../shared/ui/text-link';
import { SignUpForm } from '../components/sign-up-form';

export const SignUpScreen = () => (
  <Screen>
    <Heading title="Criar conta" subtitle="Sua lista fica salva e sincronizada." />
    <SignUpForm />
    <TextLink href="/sign-in" prefix="Já tem conta?" label="Entrar" />
  </Screen>
);
