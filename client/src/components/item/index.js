import { Button, Card, Flex, Text, Title } from "@mantine/core";
import {
  IconHeart,
  IconHeartFilled,
  IconMessageDots,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Comments } from "../comments";
import { addLike } from "../../api/likeApi/addLike";
import { useSelector } from "react-redux";
import { checkLike } from "../../api/likeApi/checkLike";
import { removeLike } from "../../api/likeApi/removeLike";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { UpdateItem } from "../updateItem";
import { DeleteModal } from "../deleteModal";
import { removeItem } from "../../api/itemApi/removeItem";
import { useTranslation } from "react-i18next";
import { useAdmin } from "../../core/useAdmin";

const Item = (props) => {
  const { item, refetch } = props;
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [showComments, setShowComments] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const email = useSelector((state) => state.user.email) || "";
  const navigate = useNavigate();
  const [countOfLikes, setCountOfLikes] = useState(item.likes.length);
  const isCreator = () => {
    return email === item.itemCollection.user.email;
  };
  const { data: isAdmin } = useAdmin(email);

  useEffect(() => {
    const checkUserLike = async () => {
      const userHasLiked = await checkLike(email, item._id);
      setHasLiked(userHasLiked);
    };

    checkUserLike();
  }, [email, item._id]);
  const sendLike = async () => {
    try {
      setHasLiked(true);
      await addLike(email, item._id);
      setCountOfLikes(item.likes.length + 1);
    } catch (e) {
      console.log(e.message);
      navigate(`/login`, { replace: true });
    }
  };

  const deleteLike = async () => {
    try {
      await removeLike(email, item._id);
      setHasLiked(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDelete = async () => {
    try {
      await removeItem(item._id);
      closeModal();
      refetch();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={"100%"}
      maw={900}
      className="collection-wrapper"
    >
      <UpdateItem
        opened={opened}
        close={close}
        item={item}
        refetch={refetch}
      ></UpdateItem>
      <DeleteModal
        openedModal={openedModal}
        handleDelete={handleDelete}
        closeModal={closeModal}
      ></DeleteModal>{" "}
      <Flex>
        <Flex direction={"column"} gap={7} justify={"center"} w={"100%"}>
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Title order={3}>{item.name}</Title>
            <Text>
              {t("Author")}:{item.itemCollection.user.email}
            </Text>
            {(isAdmin || isCreator()) && (
              <Flex gap={5}>
                <Button color="red" radius="lg" onClick={open}>
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
          <Flex
            direction={"row"}
            justify={"space-between"}
            gap={5}
            align={"center"}
          >
            <Text>
              {t("collection")}:{item.itemCollection.name}
            </Text>
            <Title lh={1.2} order={5}>
              {item.tags.length ? (
                item.tags.map((tag, index) => (
                  <span key={index} style={{ fontWeight: "350", color: "red" }}>
                    {tag}{" "}
                  </span>
                ))
              ) : (
                <span style={{ fontWeight: "350" }}>{t("no tags")}</span>
              )}
            </Title>
            <Flex direction={"row"} gap={7}>
              <IconMessageDots
                onClick={() => {
                  showComments ? setShowComments(false) : setShowComments(true);
                }}
              ></IconMessageDots>
              <span style={{ fontWeight: "350" }}>{item.comments.length}</span>
              {!hasLiked ? (
                <IconHeart onClick={sendLike}></IconHeart>
              ) : (
                <IconHeartFilled onClick={deleteLike}></IconHeartFilled>
              )}
              <span style={{ fontWeight: "350" }}>{countOfLikes}</span>
            </Flex>
          </Flex>
          {showComments && <Comments item={item}></Comments>}
        </Flex>
      </Flex>
    </Card>
  );
};

export { Item };
