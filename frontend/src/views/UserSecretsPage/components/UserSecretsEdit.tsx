import { useGetConsumerSecret, useUpdateConsumerSecret } from "@app/hooks/api/consumerSecrets"
import { usePopUp } from "@app/hooks";
import { UserSecretsForm } from "./UserSecretsForm"
import {
  Button,
  Modal,
  ModalContent
} from "@app/components/v2";
import { useEffect } from "react";

const POPUP_USER_SECRET_EDIT = "editUserSecret";

export const UserSecretsEdit = (props) => {
  const { mutateAsync: updateConsumerSecret } = useUpdateConsumerSecret();
  const { handlePopUpClose, handlePopUpOpen, handlePopUpToggle, popUp } = usePopUp([POPUP_USER_SECRET_EDIT]);

  const { data } = useGetConsumerSecret(props.selectedConsumerSecretId);

  function onSubmit(formFields) {
    updateConsumerSecret(formFields);
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
        <ModalContent title="Title" subTitle="Subtitle">
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
