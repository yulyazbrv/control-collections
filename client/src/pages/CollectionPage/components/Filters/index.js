import { Button, Flex, Select } from "@mantine/core";
import { useState } from "react";

const Filters = (props) => {
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
        placeholder="Sort by..."
        value={filter}
        onChange={setFilter}
        data={[
          { value: "likes", label: "Likes" },
          { value: "comments", label: "Comments" },
          { value: "alphabet", label: "Alphabetically" },
          { value: "tags", label: "Tags" },
        ]}
      ></Select>
      <Button color="red" radius="lg" uppercase onClick={confirmSort}>
        Confirm
      </Button>
    </Flex>
  );
};

export { Filters };
