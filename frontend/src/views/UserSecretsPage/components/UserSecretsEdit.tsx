import { useGetConsumerSecret, useUpdateConsumerSecret } from "@app/hooks/api/consumerSecrets"
import { usePopUp } from "@app/hooks";
import { UserSecretsForm } from "./UserSecretsForm"
import {
  Button,
  Modal,
  ModalContent
} from "@app/components/v2";
import { useEffect } from "react";
// import { usePopUpAction } from "@app/views/SecretMainPage/SecretMainPage.store";

// todo: move to https://github.com/Infisical/infisical/blob/d94b4b2a3c23f5b40e58c2cdb267dc22867883b0/frontend/src/views/SecretMainPage/SecretMainPage.store.tsx#L35 ?
const POPUP_USER_SECRET_EDIT = "editUserSecret";

export const UserSecretsEdit = (props) => {
  const { mutateAsync: updateConsumerSecret } = useUpdateConsumerSecret();
  const { handlePopUpClose, handlePopUpOpen, handlePopUpToggle, popUp } = usePopUp([POPUP_USER_SECRET_EDIT]);
  // const { closePopUp } = usePopUpAction();

  const { data } = useGetConsumerSecret(props.selectedConsumerSecretId);

  async function onSubmit(formFields) {
    await updateConsumerSecret(formFields);
    handlePopUpClose(POPUP_USER_SECRET_EDIT);
    props.onCancel();
    // closePopUp(POPUP_USER_SECRET_EDIT);
  }

  useEffect(() => {
    if (props.selectedConsumerSecretId) {
      handlePopUpOpen(POPUP_USER_SECRET_EDIT);
    }
  }, [props.selectedConsumerSecretId]);

  return (
    <div>
      <Modal
        isOpen={popUp[POPUP_USER_SECRET_EDIT].isOpen}
        onOpenChange={(isOpen) => {
          handlePopUpToggle(POPUP_USER_SECRET_EDIT, isOpen);
          if (!isOpen) {
            props.onCancel();
          }
        }}
      >
        <ModalContent title="Edit User Secret" subTitle="Changes cannot be reverted after submission">
          <UserSecretsForm
            onCancel={() => {
              handlePopUpClose(POPUP_USER_SECRET_EDIT);
              props.onCancel();
            }}
            onSubmit={onSubmit}
            initialValues={data}
          />
        </ModalContent>
      </Modal>
    </div>
  );
}
