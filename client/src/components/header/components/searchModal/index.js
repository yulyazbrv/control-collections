import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { debounce } from "../../../../helpers/debounce";

const { Drawer, Flex, Input } = require("@mantine/core");
const { SearchArea } = require("../../../searchArea");

const SearchModal = (props) => {
  const { opened, setOpened } = props;
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const handleChange = (e) => {
    setSearchText(e.target.value);
    setShowSearch(true);
  }
  const handleChangeWithDebounce = debounce(handleChange, 1000)
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
            onChange={handleChangeWithDebounce}
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
