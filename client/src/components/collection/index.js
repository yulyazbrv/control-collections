import ReactMarkdown from "react-markdown";
import { Button, Card, Flex, Image, Title } from "@mantine/core";
import "./style.css";

const Collection = (props) => {
  const { collection } = props;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w={"100%"}>
      <Flex>
        <Flex>
          <Image></Image>
        </Flex>
        <Flex direction={"column"} gap={7} justify={"center"} w={"100%"}>
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Title order={3}>{collection.name}</Title>
            <Button color="red" radius="lg" uppercase w={100}>
              Update
            </Button>
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
