import { Flex, Image, LoadingOverlay, Text } from "@mantine/core";
import { useCollections } from "../../core/useCollections";
import { Collection } from "../../components/collection";
import emptyIcon from "./assets/nothing.png";
import { useSelector } from "react-redux";
import { TagsCloud } from "../../components/tagsCloud";
import { useItems } from "../../core/useItems";
import { Item } from "../../components/item";

const HomePage = () => {
  const { data: collections, isFetching: isLoading } = useCollections();
  const { data: items, isFetching: isLoadingItems } = useItems();
  const email = useSelector((state) => state.user.email) || "";
  const biggestCollections = collections
    ? collections.sort((a, b) => b.items.length - a.items.length).slice(0, 5)
    : [];
  return (
    <Flex align={"center"} direction={"column"} justify={"center"}>
      <TagsCloud></TagsCloud>
      <Flex direction={"column"} mt={30} w={"100%"} align={"center"}>
        <LoadingOverlay visible={isLoading} overlayBlur={5} />
        <Text>5 the biggest collections</Text>
        {biggestCollections ? (
          biggestCollections.map((collection, index) => (
            <Collection
              key={index}
              collection={collection}
              email={email}
            ></Collection>
          ))
        ) : (
          <Flex>
            <Image src={emptyIcon} alt="empty"></Image>
          </Flex>
        )}
        <Text mt={30}>Last added items</Text>
        {items && (
          items.map((item, index) => (
            <Item
              key={index}
              item={item}
            ></Item>
          ))
        )}
      </Flex>
    </Flex>
  );
};

export { HomePage };
