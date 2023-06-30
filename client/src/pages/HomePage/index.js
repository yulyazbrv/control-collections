import { Flex, Image, LoadingOverlay } from "@mantine/core";
import { useCollections } from "../../core/useCollections";
import { Collection } from "../../components/collection";
import emptyIcon from "./assets/nothing.png";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { data: collections, isFetching: isLoading } = useCollections();
  const email = useSelector((state) => state.user.email) || "";

  return (
    <Flex justify={"center"}>
      <Flex direction={"column"} mt={60} w={"70vw"}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        {collections ? (
          collections.map((collection, index) => (
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
      </Flex>
    </Flex>
  );
};

export { HomePage };
