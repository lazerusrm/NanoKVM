import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { isPasswordUpdated } from '@/api/auth.ts';

export const Notification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if password has been updated - if not, force redirect to password change
    // This is a security requirement - users must change the default password
    isPasswordUpdated().then((rsp) => {
      if (rsp.code === 0 && !rsp.data.isUpdated) {
        navigate('/auth/password', { replace: true });
      }
    });
  }, [navigate]);

  return null;
};
