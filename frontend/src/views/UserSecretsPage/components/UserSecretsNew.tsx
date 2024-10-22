import { UserSecretsForm } from "./UserSecretsForm"

export const UserSecretsNew = () => {
  function onSubmit(formFields) {
    console.log({formFields})
  }

  return (
    <div>
      <UserSecretsForm onSubmit={onSubmit} />
    </div>
  )
}
