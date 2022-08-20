import { useQuery } from '@blitzjs/rpc';

import getCurrentUser, { CurrentUser } from 'app/users/queries/getCurrentUser';

const useCurrentUser = (options?: {
  suspense?: boolean;
}): CurrentUser | undefined | null => {
  const [user] = useQuery(getCurrentUser, null, {
    suspense: options?.suspense ?? true,
  });

  return user;
};

export default useCurrentUser;
