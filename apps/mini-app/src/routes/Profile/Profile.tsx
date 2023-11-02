import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TextField } from "ui/TextField";

interface Inputs {
  firstName: string;
  lastName: string;
}

export function Component() {
  const { handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = () => {
    console.log("submit");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField fullWidth id="firstName" margin="normal" variant="standard" />
      <TextField fullWidth id="lastName" margin="normal" variant="standard" />
    </form>
  );
}

Component.displayName = "Profile";
