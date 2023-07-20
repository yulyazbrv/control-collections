import { Button, Modal } from "@mantine/core";
import { useTranslation } from "react-i18next";

const DeleteModal = (props) => {
  const { t } = useTranslation();
  const { openedModal, closeModal, handleDelete } = props;
  return (
    <Modal
      opened={openedModal}
      onClose={closeModal}
      title={t("are you sure?")}
      centered
      size={"xs"}
    >
      <Button color="red" radius="lg" onClick={handleDelete}>
        {t("delete")}
      </Button>
    </Modal>
  );
};

export { DeleteModal };
