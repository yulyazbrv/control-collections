import { Button, Flex, Select } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Filters = (props) => {
  const { t } = useTranslation();
  const { items, setItems } = props;
  const [filter, setFilter] = useState();

  const sortedItems = (items) => {
    switch (filter) {
      case "likes":
        return items.sort((a, b) => b.likes.length - a.likes.length);
      case "comments":
        return items.sort((a, b) => b.comments.length - a.comments.length);
      case "tags":
        return items.sort((a, b) => b.tags.length - a.tags.length);
      case "alphabet":
        return items.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return items;
    }
  };

  const confirmSort = () => {
    const updateItems = sortedItems([...items]);
    setItems(updateItems);
  };
  return (
    <Flex direction={"row"} gap={5}>
      <Select
        radius="lg"
        placeholder={t("sort by...")}
        value={filter}
        onChange={setFilter}
        data={[
          { value: "likes", label: t("likes") },
          { value: "comments", label: t("comments") },
          { value: "alphabet", label: t("alphabetically") },
          { value: "tags", label: t("tags") },
        ]}
      ></Select>
      <Button color="red" radius="lg" uppercase onClick={confirmSort}>
        {t("confirm")}
      </Button>
    </Flex>
  );
};

export { Filters };
