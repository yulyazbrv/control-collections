import { Button, Card, Flex, Title } from "@mantine/core";
import { IconHeart, IconMessageDots } from "@tabler/icons-react";

const Item = (props) => {
  const { item } = props;
  // const [opened, { open, close }] = useDisclosure(false);

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
            <Button color="red" radius="lg" uppercase w={100} >
              Update
            </Button>
          </Flex>
          <Flex direction={"column"}>
            <Title lh={1.2} order={5}>
              {item.tags ? (
                item.tags.map((tag) => (
                  <span style={{ fontWeight: "350" }}>{tag.name}</span>
                ))
              ) : (
                <span style={{ fontWeight: "350" }}>no tags</span>
              )}
            </Title>
            <Flex direction={"row"}>
              <IconMessageDots></IconMessageDots>
              <IconHeart></IconHeart>
              <span style={{ fontWeight: "350" }}>{item.likes}</span>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export { Item };
