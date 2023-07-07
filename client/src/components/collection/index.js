import ReactMarkdown from "react-markdown";
import { Button, Card, Flex, Image, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "./style.css";
import { UpdateCollection } from "../updateCollection";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCollection } from "../../redux/slices/collectionSlice";
import { DeleteModal } from "../deleteModal";
import { removeCollection } from "../../api/collectionApi/removeCollection";
import { useTranslation } from "react-i18next";

const Collection = (props) => {
  const { collection, email, refetch } = props;
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openItem = () => {
    dispatch(setCollection(collection));
    navigate(`/collection/${collection._id}`, { replace: true });
  };
  const handleDelete = async () => {
    try {
      await removeCollection(collection._id);
      closeModal();
      refetch();
    } catch (e) {
      console.log(e.message);
    }
  };
  const isCreator = () => email === collection.user.email;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={"100%"}
      maw={900}
      className="collection-wrapper"
      onClick={openItem}
    >
      <UpdateCollection
        opened={opened}
        close={close}
        collection={collection}
        refetch={refetch}
      ></UpdateCollection>
      <DeleteModal
        openedModal={openedModal}
        handleDelete={handleDelete}
      ></DeleteModal>
      <Flex>
        <Flex>
          <Image></Image>
        </Flex>
        <Flex direction={"column"} gap={7} justify={"center"} w={"100%"}>
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Title order={3}>{collection.name}</Title>
            {isCreator() && (
              <Flex gap={5}>
                <Button color="red" radius="lg"onClick={(e) => {
                    open();
                    e.stopPropagation();
                  }}>
                  {t("update")}
                </Button>
                <Button
                  color="red"
                  radius="lg"
                  onClick={(e) => {
                    openModal();
                    e.stopPropagation();
                  }}
                >
                  {t("delete")}
                </Button>
              </Flex>
            )}
          </Flex>
          <Flex direction={"column"}>
            <ReactMarkdown className="markdown-text">
              {collection.description}
            </ReactMarkdown>
            <Title lh={1.2} order={5}>
              {t("theme")}:{" "}
              <span style={{ fontWeight: "350" }}>{collection.theme}</span>
            </Title>
            <Title lh={1.2} order={5}>
              {t("items")} {t("count")}:{" "}
              <span style={{ fontWeight: "350" }}>
                {collection.items.length}
              </span>
            </Title>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export { Collection };
