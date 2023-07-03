import { Card, Flex, Loader, LoadingOverlay } from "@mantine/core";
import { IconCross, IconX } from "@tabler/icons-react";
import { useItemsByTag } from "../../../../core/useItemsByTag";
import { Item } from "../../../item";
import { useSelector } from "react-redux";

const BoxItems = (props) => {
  const { tag, setBoxItems } = props;
  const { data: items, isFetching: isLoading } = useItemsByTag(tag);
  // const email = useSelector((state) => state.user.email);

  // const isCreator = () => email === collection.user.email;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex direction={"column"} align={"center"}>
        {isLoading && <Loader variant="dots" />}
        <Flex w={"100%"} direction={"row"} justify={"flex-end"}>
          <IconX onClick={() => setBoxItems(false)}></IconX>
        </Flex>
        {items &&
          items.map((item, index) => <Item key={index} item={item}></Item>)}
      </Flex>
    </Card>
  );
};

export { BoxItems };
