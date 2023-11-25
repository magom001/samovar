import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export function LocalizationProvider({
  children,
  ...rest
}: Exclude<PropsWithChildren<ComponentProps<typeof MuiLocalizationProvider>>, 'dateAdapter'>): ReactNode {
  return (
    <MuiLocalizationProvider {...rest} dateAdapter={AdapterDayjs}>
      {children}
    </MuiLocalizationProvider>
  );
}
