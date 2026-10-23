import { Redirect } from 'expo-router';
import { useAuthStatus } from '../features/auth/hooks/use-auth-status';

const StartRedirect = () => {
  const status = useAuthStatus();
  if (status === 'loading') return null;
  return <Redirect href={status === 'signed-in' ? '/list' : '/sign-in'} />;
};

export default StartRedirect;
