import { Flex, Image, LoadingOverlay, Select, Text } from "@mantine/core";
import { useCollections } from "../../core/useCollections";
import { Collection } from "../../components/collection";
import emptyIcon from "./assets/nothing.png";
import { useSelector } from "react-redux";
import { TagsCloud } from "../../components/tagsCloud";
import { useItems } from "../../core/useItems";
import { Item } from "../../components/item";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

const HomePage = (props) => {
  const { auth } = props;
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const {
    data: collections,
    isFetching: isLoading,
    refetch,
  } = useCollections();
  const { data: items, refetch: refetchItems } = useItems();
  const email = useSelector((state) => state.user.email) || "";
  const biggestCollections = collections
    ? collections.sort((a, b) => b.items.length - a.items.length).slice(0, 5)
    : [];

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <Flex align={"center"} direction={"column"} justify={"center"}>
      <Flex justify={"space-between"} maw={900} w={"100%"}>
        <Select
          mt={50}
          w={"90px"}
          radius="lg"
          size={"xs"}
          value={language}
          onChange={setLanguage}
          data={[
            { value: "en", label: "English" },
            { value: "pl", label: "Polish" },
          ]}
        ></Select>
        <ActionIcon
          mt={50}
          variant="outline"
          color={dark ? "yellow" : "red"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
        </ActionIcon>
      </Flex>

      <TagsCloud></TagsCloud>
      <Flex direction={"column"} mt={30} w={"100%"} align={"center"}>
        <LoadingOverlay visible={isLoading} overlayBlur={5} />
        <Text>5 {t("the biggest collections")}</Text>
        {biggestCollections ? (
          biggestCollections.map((collection, index) => (
            <Collection
              key={index}
              collection={collection}
              email={email}
              refetch={refetch}
              refetchItems={refetchItems}
              auth={auth}
            ></Collection>
          ))
        ) : (
          <Flex>
            <Image src={emptyIcon} alt="empty"></Image>
          </Flex>
        )}
        <Text mt={30}>{t("Last added items")}</Text>
        {items &&
          items.map((item, index) => (
            <Item key={index} item={item} auth={auth}></Item>
          ))}
      </Flex>
    </Flex>
  );
};

export { HomePage };
