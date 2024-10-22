import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import {
  useDeleteConsumerSecret,
  useGetConsumerSecrets
} from "@app/hooks/api/consumerSecrets"
import {
  IconButton,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr
} from "@app/components/v2";

export const UserSecretsList = () => {
  const { data } = useGetConsumerSecrets();

  const { mutateAsync: deleteConsumerSecret } = useDeleteConsumerSecret();

  return (
    <div>
      <TableContainer>
        <Table>
          <THead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Username</Th>
              <Th>Password</Th>
              <Th>Created At</Th>
              <Th>Updated At</Th>
              <Th aria-label="Actions"></Th>
            </Tr>
          </THead>
          <TBody>
            {data.map((userSecret) => (
              <Tr key={userSecret.id}>
                <Td>{userSecret.id}</Td>
                <Td>{userSecret.name}</Td>
                <Td>{userSecret.username}</Td>
                <Td>{userSecret.password}</Td>
                <Td>{`${format(new Date(userSecret.createdAt), "yyyy-MM-dd - HH:mm a")}`}</Td>
                <Td>{`${format(new Date(userSecret.updatedAt), "yyyy-MM-dd - HH:mm a")}`}</Td>
                <Td>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteConsumerSecret(userSecret.id)

                    // TODO: confirmation
                    // handlePopUpOpen("deleteConsumerSecretConfirmation", {
                    //   name: "delete",
                    //   id: row.id
                    // });
                  }}
                  variant="plain"
                  ariaLabel="delete user secret"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
              </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer> 
    </div>
  )
}
