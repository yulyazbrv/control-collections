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

const Item = (props) => {
  const { item, refetch } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [showComments, setShowComments] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const email = useSelector((state) => state.user.email) || "";
  const navigate = useNavigate();

  const isCreator = () => {
    return email === item.itemCollection.user.email;
  };
  console.log(isCreator());
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
      ></DeleteModal>{" "}
      <Flex>
        <Flex direction={"column"} gap={7} justify={"center"} w={"100%"}>
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Title order={3}>{item.name}</Title>
            <Text>Author:{item.itemCollection.user.email}</Text>
            {isCreator() && (
              <Flex gap={5}>
                <Button
                  color="red"
                  radius="lg"
                  uppercase
                  onClick={open}
                >
                  Update
                </Button>
                <Button
                  color="red"
                  radius="lg"
                  uppercase
                  onClick={(e) => {
                    openModal();
                    e.stopPropagation();
                  }}
                >
                  Delete
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
            <Text>Collection:{item.itemCollection.name}</Text>
            <Title lh={1.2} order={5}>
              {item.tags.length ? (
                item.tags.map((tag, index) => (
                  <span key={index} style={{ fontWeight: "350", color: "red" }}>
                    {tag}{" "}
                  </span>
                ))
              ) : (
                <span style={{ fontWeight: "350" }}>no tags</span>
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
              <span style={{ fontWeight: "350" }}>{item.likes.length}</span>
            </Flex>
          </Flex>
          {showComments && <Comments item={item}></Comments>}
        </Flex>
      </Flex>
    </Card>
  );
};

export { Item };
