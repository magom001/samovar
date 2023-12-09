import { useMutation } from 'react-query';
import { authenticatedHttpClient } from './http-client';

function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('image', file);
  return authenticatedHttpClient.post<{ imageUrl: string }>('/api/v1/user/avatar', formData);
}

export function useAvatarUpload() {
  return useMutation({
    mutationFn: (file: File) => uploadFile(file),
  });
}
