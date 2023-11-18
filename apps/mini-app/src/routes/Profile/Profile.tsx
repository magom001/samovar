import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@samovar/ui/Button";
import { Dialog, DialogContent, DialogTitle } from "@samovar/ui/Dialog";
import { TextField } from "@samovar/ui/TextField";
import { styled } from "@samovar/ui/styles";
import { Suspense, lazy, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { IconButton } from "@samovar/ui/IconButton";
import { Icon } from "@samovar/ui/Icon";

const LazyProfileForm = lazy(() => import("../../features/ProfileForm"));

interface Inputs {
  firstName: string;
  lastName: string;
}

const schema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required" })
      .trim()
      .min(3),
    lastName: z.string().min(3).max(10),
  })
  .required();

const defaultValues: Inputs = {
  firstName: "John",
  lastName: "Doe",
};

const Form = styled.form`
  padding: 32px;
`;

export function Component() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const [activeStep, setActiveStep] = useState(0);
  // const moveToNextStep = () => {
  //   setActiveStep((prev) => prev + 1);
  // };
  // const moveToPreviousStep = () => {
  //   setActiveStep((prev) => prev - 1);
  // };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("submit", data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <TextField
              label="First name"
              {...field}
              error={Boolean(errors?.firstName?.message)}
              fullWidth
              helperText={errors?.firstName?.message ?? " "}
              margin="dense"
              variant="standard"
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <TextField
              fullWidth
              label="Last name"
              {...field}
              helperText={" "}
              margin="dense"
              variant="standard"
            />
          )}
        />
        <input type="submit" />
      </Form>
      <div>
        <h4>Profiles:</h4>
        <Button
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          Create
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Dialog fullScreen open={isDialogOpen}>
          <DialogTitle>
            Create profile
            <IconButton
              onClick={() => {
                setIsDialogOpen(false);
              }}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <Icon>close</Icon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <LazyProfileForm />
          </DialogContent>
        </Dialog>
      </Suspense>
    </>
  );
}

Component.displayName = "Profile";
