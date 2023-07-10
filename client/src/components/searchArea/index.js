import { Flex, Loader, LoadingOverlay, ScrollArea, Text } from "@mantine/core";
import { useItemsById } from "../../core/useItemsById";
import { useSearch } from "../../core/useSearch";
import { Item } from "../item";
import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";

const SearchArea = (props) => {
  const { searchText } = props;
  const { data: id, isFetching: isLoadingIds } = useSearch(searchText);
  const { data: items, isFetching: isLoading, refetch } = useItemsById(id);
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);
  return (
    <ScrollArea>
      <Flex direction={"column"} w={"100%"} mih={50}>
        <LoadingOverlay
          visible={isLoading || isLoadingIds}
          overlayBlur={5}
        ></LoadingOverlay>

        {items ? (
          items.map((item, index) => (
            <Item key={index} item={item} refetch={refetch}></Item>
          ))
        ) : (
          <Text align="center">No items</Text>
        )}
      </Flex>
    </ScrollArea>
  );
};

export { SearchArea };
