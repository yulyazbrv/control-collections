import { Drawer, Button, Flex, Title, Input } from "@mantine/core";
import { useState } from "react";
import { updateItem } from "../../api/itemApi/updateItem";
import { t } from "i18next";

function UpdateItem(props) {
  const { opened, close, item, refetch } = props;
  const [result, setResult] = useState("");
  const [name, setName] = useState(item.name);
  const [tags, setTags] = useState(item.tags.join(" "));

  const updateClick = async () => {
    try {
      await updateItem(item._id, name, tags);
      close();
      refetch();
    } catch (e) {
      setResult(e.message);
    }
  };

  return (
    <>
      <Drawer
        position="bottom"
        opened={opened}
        onClose={close}
        title={t("update item")}
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <Flex align={"center"} justify={"center"}>
          <Flex
            direction={"column"}
            gap={10}
            justify={"center"}
            w={400}
            h={500}
          >
            <Title order={2}>{t("update item")}</Title>
            <Input
              placeholder={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder={t("tags")}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <Button color="red" radius="lg" onClick={updateClick}>
              {t("update")}
            </Button>
            <Title order={6}>{result}</Title>
          </Flex>
        </Flex>
      </Drawer>
    </>
  );
}

export { UpdateItem };
