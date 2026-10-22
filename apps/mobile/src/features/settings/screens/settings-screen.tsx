import { SignOutButton } from '../../auth/components/sign-out-button';
import { ChangePasswordForm } from '../../auth/components/change-password-form';
import { useSession } from '../../auth/hooks/use-session';
import { CaptureTokensCard } from '../../capture-tokens/components/capture-tokens-card';
import { Heading } from '../../../shared/ui/heading';
import { ScrollScreen } from '../../../shared/ui/scroll-screen';

export const SettingsScreen = () => {
  const { data: session } = useSession();
  return (
    <ScrollScreen>
      <Heading title={session?.user.name ?? 'Conta'} subtitle={session?.user.email} />
      <ChangePasswordForm />
      <CaptureTokensCard />
      <SignOutButton />
    </ScrollScreen>
  );
};
