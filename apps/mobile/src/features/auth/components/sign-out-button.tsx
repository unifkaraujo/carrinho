import { TextButton } from '../../../shared/ui/text-button';
import { useSignOut } from '../hooks/use-sign-out';

export const SignOutButton = () => {
  const signOut = useSignOut();
  return <TextButton label="Sair" onPress={() => signOut.mutate()} disabled={signOut.isPending} />;
};
