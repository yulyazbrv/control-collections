import { Button, Modal, Title } from "@mantine/core";

const DeleteModal = (props) => {
  const {openedModal, closeModal, handleDelete} = props
  return (
    <Modal opened={openedModal} onClose={closeModal}  title="Are you sure?" centered size={"xs"}>
      <Button color="red" radius="lg" uppercase onClick={handleDelete}>
        Delete
      </Button>
    </Modal>
  );
};

export { DeleteModal };
