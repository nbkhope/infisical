import { useForm } from "react-hook-form";

import { Button, FormControl, Input } from "@app/components/v2";
// import { useCreateConsumerSecret } from "@app/hooks/api/consumerSecrets";

export const UserSecretsForm = (props) => {
  const { handleSubmit, register } = useForm();

  // const { mutateAsync: createConsumerSecret } = useCreateConsumerSecret();

  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      // noValidate
    >
      <FormControl isRequired label="Name">
        <Input {...register('name')} />
      </FormControl>
      <FormControl label="Username">
        <Input {...register('username')} />
      </FormControl>
      <FormControl label="Password">
        <Input {...register('password')} type="password" />
      </FormControl>
      <div class="mt-7">
        <Button type="submit" className="mr-4">Create</Button>
        <Button
          // key="layout-cancel-create-project"
          onClick={props.onClose}
          variant="plain"
          colorSchema="secondary"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
