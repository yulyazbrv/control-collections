import { Card, Flex, Loader } from "@mantine/core";
import { IconX, IconZoomCancel } from "@tabler/icons-react";
import { useItemsByTag } from "../../../../core/useItemsByTag";
import { Item } from "../../../item";

const BoxItems = (props) => {
  const { tag, setBoxItems } = props;
  const { data: items, isFetching: isLoading } = useItemsByTag(tag);
  
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex direction={"column"} align={"center"}>
        {isLoading && <Loader variant="dots" />}
        <Flex w={"100%"} direction={"row"} justify={"flex-end"}>
          <IconX onClick={() => setBoxItems(false)}></IconX>
        </Flex>
        {items && items.length !== 0 ? (
          items.map((item, index) => <Item key={index} item={item}></Item>)
        ) : (
          <Flex>
            <IconZoomCancel></IconZoomCancel>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export { BoxItems };
