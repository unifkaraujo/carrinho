import { SignOutButton } from '../../auth/components/sign-out-button';
import { ChangePasswordForm } from '../../auth/components/change-password-form';
import { useSession } from '../../auth/hooks/use-session';
import { CaptureTokensCard } from '../../capture-tokens/components/capture-tokens-card';
import { ScrollScreen } from '../../../shared/ui/scroll-screen';
import { ProfileHeader } from '../components/profile-header';

export const SettingsScreen = () => {
  const { data: session } = useSession();
  return (
    <ScrollScreen>
      <ProfileHeader name={session?.user.name} email={session?.user.email} />
      <ChangePasswordForm />
      <CaptureTokensCard />
      <SignOutButton />
    </ScrollScreen>
  );
};
