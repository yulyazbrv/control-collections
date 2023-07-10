import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const { Drawer, Flex, ScrollArea, Input } = require("@mantine/core");
const { SearchArea } = require("../../../searchArea");

const SearchModal = (props) => {
  const { opened, setOpened } = props;
  const [searchText, setSearchText] = useState("");
  const { t, i18n } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  return (
    <Drawer
      opened={opened}
      onClose={() => {
        setOpened(false);
        setSearchText("");
      }}
      position="top"
      title="Search"
      size="xl"
      padding="md"
      shadow="xs"
    >
      <Flex w={"100%"} justify={"center"}>
        <Flex direction={"column"} w={"100%"} maw={900} gap={10}>
          <Input
            icon={<IconSearch />}
            placeholder={t("search")}
            radius="lg"
            variant="filled"
            size={"xs"}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowSearch(true);
            }}
          />
          {showSearch && (
            <SearchArea
              searchText={searchText}
              setShowSearch={setShowSearch}
            ></SearchArea>
          )}
        </Flex>
      </Flex>
    </Drawer>
  );
};

export { SearchModal };
