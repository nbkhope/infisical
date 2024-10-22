import { UserSecretsForm } from "./UserSecretsForm"

export const UserSecretsEdit = () => {
  function onSubmit(formFields) {
    console.log({formFields })
  }

  return (
    <div>
      <UserSecretsForm onSubmit={onSubmit} />
    </div>
  )
}
