import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "ui/TextField";
import { styled } from "ui/styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("submit", data);
  };

  return (
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
  );
}

Component.displayName = "Profile";
