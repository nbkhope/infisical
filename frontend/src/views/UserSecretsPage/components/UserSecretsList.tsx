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

export const UserSecretsList = (props) => {
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
              <Th aria-label="Actions"></Th>
            </Tr>
          </THead>
          <TBody>
            {data.map((userSecret) => (
              <Tr key={userSecret.id}>
                {/* TODO: allow multiple selection for bulk actions. usually a checkbox */}
                <Td>
                  {/* TODO make link and make url change to /user-secrets/:userSecretId */}
                  <span onClick={() => {
                    console.log('click', userSecret.id);
                    props.onItemClick(userSecret.id);
                  }}>{userSecret.id}</span>
                </Td>
                {/* TODO: some icon usually the site favicon */}
                <Td>{userSecret.name}</Td>
                <Td>{userSecret.username}</Td>
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
