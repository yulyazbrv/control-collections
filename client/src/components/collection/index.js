import ReactMarkdown from "react-markdown";
import { Button, Card, Flex, Image, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { UpdateCollection } from "../updateCollection";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCollection } from "../../redux/slices/collectionSlice";
import { DeleteModal } from "../deleteModal";
import { removeCollection } from "../../api/collectionApi/removeCollection";
import { useTranslation } from "react-i18next";
import "./style.css";
import { imagefrombuffer } from "imagefrombuffer";
import { useAdmin } from "../../core/useAdmin";

const Collection = (props) => {
  const { collection, email, refetch, auth } = props;
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCreator = () => email === collection.user.email;
  const { data: isAdmin } = useAdmin(email);

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

  return (
    <>
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
        <Flex align={"center"} gap={10}>
          <Flex>
            {collection.image && (
              <Image
                maw={100}
                mah={100}
                src={imagefrombuffer({
                  type: collection.image?.contentType,
                  data: collection.image?.data,
                })}
              ></Image>
            )}
          </Flex>
          <Flex direction={"column"} gap={7} justify={"center"} w={"100%"}>
            <Flex
              align={"center"}
              justify={"space-between"}
              w={"100%"}
              wrap={"wrap"}
            >
              <Title order={3}>{collection.name}</Title>
              {(isAdmin || isCreator()) && auth && (
                <Flex gap={5}>
                  <Button
                    color="red"
                    radius="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      open();
                    }}
                  >
                    {t("update")}
                  </Button>
                  <Button
                    color="red"
                    radius="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
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
    </>
  );
};

export { Collection };
