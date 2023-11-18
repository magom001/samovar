import { Button } from "@samovar/ui/Button";
import { Step, StepContent, StepLabel, Stepper } from "@samovar/ui/Stepper";
import { InputLabel } from "@samovar/ui/InputLabel";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "@samovar/ui/Select";
import { MenuItem } from "@samovar/ui/MenuItem";
import { Controller, useForm } from "react-hook-form";
import { FormControl } from "@samovar/ui/FormControl";

const STEPS_MAP: Record<string, (arg: () => void) => JSX.Element[]> = {
  musician: MusicianSteps,
  singer: SingerSteps,
};

function ProfileForm() {
  const { t } = useTranslation(["profile"]);
  const [activeStep, setActiveStep] = useState(0);
  const { handleSubmit, control, watch } = useForm<Record<string, string>>({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const profile = watch("type");
  const Component = STEPS_MAP[profile];

  const onSubmit = (data: unknown) => {
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>{t("Select profile")}</StepLabel>
          <StepContent>
            <Controller
              control={control}
              defaultValue=""
              name="type"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="profile-type">Select profile type</InputLabel>
                  <Select
                    id="profile-type"
                    label="Select profile type"
                    labelId="profile-type"
                    {...field}
                  >
                    <MenuItem value="musician">Musician</MenuItem>
                    <MenuItem value="singer">Singer</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Button onClick={handleNext}>Next</Button>
          </StepContent>
        </Step>
        {Component ? Component(handleNext) : null}
        <Step>
          <StepLabel>Submit</StepLabel>
          <StepContent>
            <input type="submit" />
          </StepContent>
        </Step>
      </Stepper>
    </form>
  );
}

function MusicianSteps(handleNext: () => void) {
  return [
    <Step key="1">
      <StepLabel>Step musician</StepLabel>
      <StepContent>
        Content
        <Button onClick={handleNext}>Next</Button>
      </StepContent>
    </Step>,
  ];
}

function SingerSteps(handleNext: () => void) {
  return [
    <Step key="2">
      <StepLabel>Step singer</StepLabel>
      <StepContent>
        Content
        <Button onClick={handleNext}>Next</Button>
      </StepContent>
    </Step>,
  ];
}

export default ProfileForm;
