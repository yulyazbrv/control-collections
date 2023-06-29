import ReactMarkdown from "react-markdown";
import { Button, Card, Flex, Image, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "./style.css";
import { UpdateCollection } from "../updateCollection";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCollection } from "../../redux/slices/collectionSlice";

const Collection = (props) => {
  const { collection, email } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openItem = () => {
    dispatch(setCollection(collection));
    navigate(`/collection`, { replace: true });
  };
  console.log("email ", email)
  console.log("email! ", collection.user.email)

  const isCreator = () => email === collection.user.email;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={"100%"}
      className="collection-wrapper"
      onClick={openItem}
    >
      <UpdateCollection
        opened={opened}
        close={close}
        collection={collection}
      ></UpdateCollection>
      <Flex>
        <Flex>
          <Image></Image>
        </Flex>
        <Flex direction={"column"} gap={7} justify={"center"} w={"100%"}>
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Title order={3}>{collection.name}</Title>
            {isCreator() && (
              <Button color="red" radius="lg" uppercase w={100} onClick={open}>
                Update
              </Button>
            )}
          </Flex>
          <Flex direction={"column"}>
            <ReactMarkdown className="markdown-text">
              {collection.description}
            </ReactMarkdown>
            <Title lh={1.2} order={5}>
              theme:{" "}
              <span style={{ fontWeight: "350" }}>{collection.theme}</span>
            </Title>
            <Title lh={1.2} order={5}>
              items count:{" "}
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
