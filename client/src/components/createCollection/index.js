import { Drawer, Button, Flex, Title, Input } from "@mantine/core";
import { useState } from "react";
import { addCollection } from "../../api/collectionApi/addCollection";
import {  useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function CreateCollection(props) {
  const { opened, close, refetch } = props;
  const [name, setName] = useState("");
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [result, setResult] = useState("");
  const email = useSelector((state) => state.user.email);
  const createClick = async () => {
    try {
      await addCollection(email, name, description, theme);
      close();
      refetch()
    } catch (e) {
      setResult(e.message);
    }
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={t("create collection")}
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
            <Title order={2}>{t("create collection")}</Title>
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
            <Button color="red" radius="lg" onClick={createClick}>
            {t("create")}
            </Button>
            <Title order={6}>{result}</Title>
          </Flex>
        </Flex>
      </Drawer>
    </>
  );
}

export { CreateCollection };
