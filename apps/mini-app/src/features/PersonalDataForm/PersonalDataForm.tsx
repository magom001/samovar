import type { UpdateUserDataDto, UserData } from '@samovar/models';
import { Button } from '@samovar/ui/Button';
import { DatePicker } from '@samovar/ui/DatePicker';
import { Icon } from '@samovar/ui/Icon';
import { IconButton } from '@samovar/ui/IconButton';
import { TextField } from '@samovar/ui/TextField';
import { Tooltip } from '@samovar/ui/Tooltip';
import type { AxiosResponse } from 'axios';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { authenticatedHttpClient } from '../../services/http-client';
import { AvatarUploader } from '../../components/AvatarUploader/AvatarUploader';

function getWhoAmI(): Promise<AxiosResponse<UserData>> {
  return authenticatedHttpClient.get('api/v1/auth/whoami');
}

export function PersonalDataForm() {
  const result = useQuery('whoami', getWhoAmI, { suspense: true, refetchOnWindowFocus: false });
  const { t } = useTranslation(['common', 'profile']);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<UpdateUserDataDto & { dateOfBirth?: Dayjs | null }>({
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
      <AvatarUploader src={result.data?.data.data?.avatarUrl} />
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => <TextField {...field} fullWidth label="First name" margin="dense" size="small" />}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field }) => <TextField {...field} fullWidth label="Last name" margin="dense" size="small" />}
      />
      <Controller
        control={control}
        defaultValue={null}
        name="dateOfBirth"
        render={({ field }) => {
          const { value, ...rest } = field;
          return (
            <DatePicker
              {...rest}
              disableFuture
              label={t('profile:Date of birth')}
              localeText={{
                toolbarTitle: '',
                nextMonth: t('common:Next month'),
                previousMonth: t('common:Previous month'),
              }}
              slotProps={{
                textField: {
                  margin: 'dense',
                  size: 'small',
                  fullWidth: true,
                  InputProps: {
                    endAdornment: (
                      <Tooltip
                        arrow
                        enterTouchDelay={0}
                        leaveTouchDelay={5000}
                        placement="bottom-start"
                        title={t('profile:Date of birth tooltip')}
                      >
                        <IconButton
                          edge="end"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Icon>help_outline</Icon>
                        </IconButton>
                      </Tooltip>
                    ),
                  },
                },
              }}
              timezone="UTC"
              value={value ? dayjs.utc(value) : value}
            />
          );
        }}
      />

      <Button disabled={!isDirty} type="submit">
        Save
      </Button>
    </form>
  );
}
