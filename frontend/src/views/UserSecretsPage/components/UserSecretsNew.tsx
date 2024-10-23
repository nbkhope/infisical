import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCreateConsumerSecret } from "@app/hooks/api/consumerSecrets"
import { usePopUp } from "@app/hooks";
import { UserSecretsForm } from "./UserSecretsForm"
import {
  Button,
  Modal,
  ModalContent
} from "@app/components/v2";

const POPUP_USER_SECRET_CREATE = "createUserSecret";

export const UserSecretsNew = () => {
  const { mutateAsync: createConsumerSecret } = useCreateConsumerSecret();
  const { handlePopUpClose, handlePopUpOpen, handlePopUpToggle, popUp } = usePopUp([POPUP_USER_SECRET_CREATE]);

  function onSubmit(formFields) {
    createConsumerSecret(formFields);
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          {/* TODO: search */}
        </div>
        <Button leftIcon={<FontAwesomeIcon icon={faPlus} />}onClick={() => handlePopUpOpen(POPUP_USER_SECRET_CREATE)}>Create User Secret</Button>
      </div>
      <Modal isOpen={popUp[POPUP_USER_SECRET_CREATE].isOpen} onOpenChange={(isOpen) => handlePopUpToggle(POPUP_USER_SECRET_CREATE, isOpen)}>
        <ModalContent title="Title" subTitle="Subtitle">
          <UserSecretsForm onCancel={() => handlePopUpClose(POPUP_USER_SECRET_CREATE)} onSubmit={onSubmit} />
        </ModalContent>
      </Modal>
    </>
  )
}
