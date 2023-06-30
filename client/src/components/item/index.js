import { Button, Card, Flex, Title } from "@mantine/core";
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

const Item = (props) => {
  const { item, isCreator } = props;
  // const [opened, { open, close }] = useDisclosure(false);
  const [showComments, setShowComments] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const email = useSelector((state) => state.user.email) || "";
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
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={"100%"}
      className="collection-wrapper"
    >
      {/* <UpdateCollection opened={opened} close={close} collection={collection}></UpdateCollection> */}
      <Flex>
        <Flex direction={"column"} gap={7} justify={"center"} w={"100%"}>
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Title order={3}>{item.name}</Title>
            {isCreator() && (
              <Button color="red" radius="lg" uppercase w={100}>
                Update
              </Button>
            )}
          </Flex>
          <Flex direction={"row"} justify={"space-between"} gap={5}>
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
