import { Button, Card, Flex, Loader } from "@mantine/core";
import { useTags } from "../../core/useTags";
import { useState } from "react";
import { BoxItems } from "./components/BoxItems";

const TagsCloud = () => {
  const [tag, setTag] = useState("");
  const [boxItems, setBoxItems] = useState(false);
  const { data: tags, isFetching: isLoading } = useTags();
  return (
    <Flex direction={"column"} mt={60}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {isLoading && <Loader></Loader>}
        <Flex direction={"row"} wrap={"wrap"} gap={5}>
          {tags
            ? tags.map((tag, index) => (
                <Button
                  color="red"
                  radius="lg"
                  key={index}
                  onClick={() => {
                    setTag(tag.name);
                    setBoxItems(true);
                  }}
                >
                  {tag.name}
                </Button>
              ))
            : []}
        </Flex>
      </Card>
      {boxItems && <BoxItems tag={tag} setBoxItems={setBoxItems}></BoxItems>}
    </Flex>
  );
};

export { TagsCloud };
