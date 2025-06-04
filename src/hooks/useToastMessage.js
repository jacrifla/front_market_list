import { useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

export default function useToastMessage(success, error) {
  useEffect(() => {
    if (success) toast.success(success);
    if (error) toast.error(error);
  }, [success, error]);

  const showToast = useCallback((message, type = 'info') => {
    if (type === 'error') toast.error(message);
    else if (type === 'success') toast.success(message);
    else toast(message);
  }, []);

  return { showToast };
}
