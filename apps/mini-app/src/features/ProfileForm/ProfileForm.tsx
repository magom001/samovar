import { Autocomplete } from '@samovar/ui/Autocomplete';
import { Button } from '@samovar/ui/Button';
import { FormControl } from '@samovar/ui/FormControl';
import { FormControlLabel } from '@samovar/ui/FormControlLabel';
import { FormLabel } from '@samovar/ui/FormLabel';
import { InputLabel } from '@samovar/ui/InputLabel';
import { MenuItem } from '@samovar/ui/MenuItem';
import { Radio } from '@samovar/ui/Radio';
import { RadioGroup } from '@samovar/ui/RadioGroup';
import { Select } from '@samovar/ui/Select';
import { TextField } from '@samovar/ui/TextField';
import { Typography } from '@samovar/ui/Typography';
import type { CustomTypeOptions } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

function ProfileForm() {
  const { t } = useTranslation(['profile', 'instruments']);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- dev
  const { handleSubmit, control } = useForm<Record<string, any>>({});

  const onSubmit = (data: unknown) => {
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        defaultValue="musician"
        name="type"
        render={({ field }) => (
          <FormControl fullWidth margin="dense">
            <InputLabel id="profile-type">Select profile type</InputLabel>
            <Select id="profile-type" label="Select profile type" labelId="profile-type" {...field}>
              <MenuItem value="musician">
                <Typography sx={{ textTransform: 'capitalize' }}>{t('profile:musician')}</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="instrument"
        render={({ field }) => {
          const { onChange, ...rest } = field;
          return (
            <Autocomplete<AutocompleteKeyValue>
              {...rest}
              disablePortal
              fullWidth
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- nonsense
              getOptionLabel={(option) => t(`instruments:${option.label}`)}
              onChange={(event, value) => {
                onChange(value?.value);
              }}
              options={Instruments}
              renderInput={(params) => <TextField {...params} label="Instrument" margin="dense" />}
              slotProps={{
                paper: { sx: { textTransform: 'capitalize' } },
              }}
            />
          );
        }}
      />
      <Controller
        control={control}
        defaultValue="amateur"
        name="skillLevel"
        render={({ field }) => {
          return (
            <FormControl fullWidth margin="dense">
              <FormLabel id="skill-level-group-label">Gender</FormLabel>
              <RadioGroup {...field} aria-labelledby="skill-level-group-label">
                <FormControlLabel control={<Radio />} label="Novice" value="novice" />
                <FormControlLabel control={<Radio />} label="Amateur" value="amateur" />
                <FormControlLabel control={<Radio />} label="Virtuoso" value="virtuoso" />
              </RadioGroup>
            </FormControl>
          );
        }}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

type KnownInstruments = keyof CustomTypeOptions['resources']['instruments'];

interface AutocompleteKeyValue {
  label: KnownInstruments;
  value: string;
}

const Instruments: AutocompleteKeyValue[] = [
  { label: 'guitar', value: 'guitar' },
  { label: 'bass', value: 'bass' },
  { label: 'drums', value: 'drums' },
  { label: 'piano', value: 'piano' },
];

export default ProfileForm;
