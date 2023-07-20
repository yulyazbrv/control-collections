import { Button, Flex, Image, LoadingOverlay, Title } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";
import emptyIcon from "./assets/preview.jpg";
import { useCollectionItems } from "../../core/useCollectionItems";
import { useSelector } from "react-redux";
import { Item } from "../../components/item";
import { CreateItem } from "../../components/createItem";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Filters } from "./components/Filters";
import { useParams } from "react-router-dom";
import { useCollectionById } from "../../core/useCollectionById";
import { useTranslation } from "react-i18next";
import { useAdmin } from "../../core/useAdmin";

const CollectionPage = () => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const { id } = useParams();
  const email = useSelector((state) => state.user.email);
  const { data: collection, isFetching: isLoadingCollection } =
    useCollectionById(id);
  const {
    data: itemsData,
    isFetching: isLoading,
    refetch,
  } = useCollectionItems(id);
  const [items, setItems] = useState();
  const isCreator = () => email === collection.user.email;
  const { data: isAdmin } = useAdmin(email);

  useEffect(() => {
    if (itemsData) {
      setItems(itemsData);
    }
  }, [itemsData]);

  return (
    <Flex direction={"column"}>
      {isLoadingCollection || isLoading ? (
        <LoadingOverlay
          visible={isLoadingCollection || isLoading}
          overlayBlur={2}
        ></LoadingOverlay>
      ) : (
        <Flex direction={"column"} align={"center"}>
          <CreateItem
            close={close}
            opened={opened}
            refetch={refetch}
          ></CreateItem>
          <Flex
            direction={"column"}
            align={"center"}
            gap={20}
            mt={60}
            w={"100%"}
          >
            <Flex
              direction={"row"}
              justify={"space-between"}
              gap={5}
              w={"100%"}
              maw={900}
            >
              {(isAdmin || isCreator()) && (
                <Flex direction={"row"} gap={5}>
                  <Button color="red" radius="lg" onClick={open}>
                    {t("create")}
                  </Button>
                </Flex>
              )}
              <Flex direction={"column"} align={"flex-end"} gap={10}>
                <Flex direction={"row"} gap={5} align={"center"}>
                  <Title order={4}>{collection.name}</Title>
                  <IconFileDescription radius="xl" />
                </Flex>
                <Filters setItems={setItems} items={items}></Filters>
              </Flex>
            </Flex>

            <Flex direction={"column"} gap={10} align={"center"} w={"100%"}>
              {items || items.length !== 0 ? (
                items.map((item, index) => (
                  <Item
                    key={index}
                    item={item}
                    isCreator={isCreator}
                    refetch={refetch}
                  ></Item>
                ))
              ) : (
                <Flex direction={"column"} w={"100%"} maw={300} mt={110}>
                  <LoadingOverlay visible={isLoading} overlayBlur={2} />
                  <Image radius={20} alt="nothing" src={emptyIcon}></Image>
                  <Button color="red" radius="lg" uppercase onClick={open}>
                    {t("create")} {t("item")}
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export { CollectionPage };
