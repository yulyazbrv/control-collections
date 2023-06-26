import { Button, Flex, Image, LoadingOverlay, Title } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";
import emptyIcon from "./assets/nothing.png";
import { useCollectionItems } from "../../core/useCollectionItems";
import { useSelector } from "react-redux";
import { Item } from "../../components/item";
import { CreateItem } from "../../components/createItem";
import { useDisclosure } from "@mantine/hooks";

const CollectionPage = (props) => {
  const { auth } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const collection = useSelector((state) => state.collection.collection);
  const { data: items, isFetching: isLoading } = useCollectionItems(
    collection._id
  );


  return (
    <Flex justify={"center"}>
      <LoadingOverlay visible={isLoading} overlayBlur={5} />
      <CreateItem close={close} opened={opened}></CreateItem>
      {auth ? (
        <Flex direction={"column"} gap={20} mt={60} w={"70vw"}>
          <Flex direction={"row"} justify={"space-between"}>
            <Flex direction={"row"} gap={5}>
              <Button color="red" radius="lg" uppercase onClick={open}>
                Create
              </Button>
              <Button color="red" radius="lg" uppercase>
                Delete
              </Button>
            </Flex>
            <Flex direction={"row"} gap={5} align={"center"}>
              <Title order={4}>{collection.name}</Title>
              <IconFileDescription radius="xl" />
            </Flex>
          </Flex>
          <Flex direction={"column"} gap={10}>
            {items
              ? items.map((item, index) => (
                  <Item key={index} item={item}></Item>
                ))
              : []}
          </Flex>
        </Flex>
      ) : (
        <Flex direction={"column"} w={"250px"} mt={110}>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <Image alt="nothing" src={emptyIcon} className="empty-img"></Image>
          <Button color="red" radius="lg" uppercase>
            Create Item
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export { CollectionPage };