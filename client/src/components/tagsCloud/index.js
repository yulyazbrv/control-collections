import { Button, Card, Flex } from "@mantine/core";
import { useTags } from "../../core/useTags";
import { useState } from "react";
import { BoxItems } from "./components/BoxItems";
import { IconZoomCancel } from "@tabler/icons-react";

const TagsCloud = () => {
  const [tag, setTag] = useState("");
  const [boxItems, setBoxItems] = useState(false);
  const { data: tags } = useTags();
  const uniqueTags = tags
    ? Array.from(new Set(tags.map((tag) => tag.name))).map((name) =>
        tags.find((tag) => tag.name === name)
      )
    : [];

  return (
    <Flex direction={"column"} mt={10} maw={900}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Flex direction={"row"} wrap={"wrap"} gap={5}>
          {uniqueTags ? (
            uniqueTags.map((tag, index) => (
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
          ) : (
            <Flex>
              <IconZoomCancel></IconZoomCancel>
            </Flex>
          )}
        </Flex>
      </Card>
      {boxItems && <BoxItems tag={tag} setBoxItems={setBoxItems}></BoxItems>}
    </Flex>
  );
};

export { TagsCloud };
