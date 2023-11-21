import { Controller, useForm } from 'react-hook-form';
import type { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { TextField } from '@samovar/ui/TextField';
import { Button } from '@samovar/ui/Button';
import type { UpdateUserDataDto, UserData } from '@samovar/models';
import { authenticatedHttpClient } from '../../services/http-client';

function getWhoAmI(): Promise<AxiosResponse<UserData>> {
  return authenticatedHttpClient.get('api/v1/auth/whoami');
}

export function PersonalDataForm() {
  const result = useQuery('whoami', getWhoAmI, { suspense: true });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<UpdateUserDataDto>({
    defaultValues: result.data?.data?.data || {},
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateUserDataDto) => {
      return authenticatedHttpClient.put<UserData>('api/v1/user/data', data);
    },
    onSuccess: ({ data: { data } }) => {
      console.log('on mutation success', data);
      reset(data ?? {});
    },
  });

  const onSubmit = (data: UpdateUserDataDto) => {
    console.log('data', data);
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => <TextField {...field} fullWidth margin="dense" size="small" />}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field }) => <TextField {...field} fullWidth margin="dense" size="small" />}
      />
      <Button disabled={!isDirty} type="submit">
        Save
      </Button>
    </form>
  );
}
