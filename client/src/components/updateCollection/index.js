import { Drawer, Button, Flex, Title, Input } from "@mantine/core";
import { useState } from "react";
import { updateCollection } from "../../api/collectionApi/updateCollection";
import { useTranslation } from "react-i18next";

function UpdateCollection(props) {
  const { opened, close, collection, refetch } = props;
  const { t } = useTranslation();
  const [result, setResult] = useState("");
  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description);
  const [theme, setTheme] = useState(collection.theme);
  const updateClick = async () => {
    try {
      await updateCollection(collection._id, name, description, theme);
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
        title={t("update Collection")}
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
            <Title order={2}>{t("update Collection")}</Title>
            <Input
              placeholder={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder={t("description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              placeholder={t("theme")}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
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

export { UpdateCollection };
