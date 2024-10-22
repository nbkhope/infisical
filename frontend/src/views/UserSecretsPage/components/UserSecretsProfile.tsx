export const UserSecretsProfile = () => {
  const {
    name,
    username,
    password,
  } = {
    name: "name",
    username: "username",
    password: "password",
  };

  return (
    <div>
      <div>
        <div>Name</div>
        <div>{name}</div>
      </div>
      <div>
        <div>Username</div>
        <div>{username}</div>
      </div>
      <div>
        <div>Password</div>
        <div>{password}</div>
      </div>
    </div>
  );
}
