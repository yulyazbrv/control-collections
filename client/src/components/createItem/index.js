import {
  Drawer,
  Button,
  Flex,
  Title,
  Input,
  Autocomplete,
} from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addItem } from "../../api/itemApi/addItem";
import { useTags } from "../../core/useTags";
import { useTranslation } from "react-i18next";

function CreateItem(props) {
  const { opened, close, refetch } = props;
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [result, setResult] = useState("");
  const { data: tagsData } = useTags();
  const uniqueTags = tagsData
    ? Array.from(new Set(tagsData.map((tag) => tag.name))).map((name) =>
        tagsData.find((tag) => tag.name === name)
      )
    : [];
  const collection = useSelector((state) => state.collection.collection);
  const createClick = async () => {
    try {
      if (tags) {
        await addItem(collection._id, name, tags);
      } else {
        await addItem(collection._id, name);
      }
      close();
      refetch();
    } catch (e) {
      setResult(e.message);
    }
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={t("create item")}
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
            <Title order={2}>{t("create item")}</Title>
            <Input
              placeholder={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Autocomplete
              value={tags}
              onChange={setTags}
              placeholder="#super #love #book"
              data={
                uniqueTags
                  ? uniqueTags.map((tag, index) => ({
                      value: tag.name,
                      key: index,
                    }))
                  : []
              }
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

export { CreateItem };
