import { useForm } from "react-hook-form";

import { Button, FormControl, Input } from "@app/components/v2";
// import { useCreateConsumerSecret } from "@app/hooks/api/consumerSecrets/mutations";

export const UserSecretsForm = (props) => {
  const { handleSubmit, register } = useForm();

  // const { mutateAsync: createConsumerSecret } = useCreateConsumerSecret();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <FormControl label="Name">
        <Input {...register('name')} />
      </FormControl>
      <FormControl label="Username">
        <Input {...register('username')} />
      </FormControl>
      <FormControl label="Password">
        <Input {...register('password')} type="password" />
      </FormControl>
      <div>
        <Button type="submit">Create</Button>
      </div>
    </form>
  )
}
