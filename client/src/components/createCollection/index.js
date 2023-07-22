import {
  Drawer,
  Button,
  Flex,
  Title,
  Input,
  FileInput,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { addCollection } from "../../api/collectionApi/addCollection";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function CreateCollection(props) {
  const { opened, close, refetch } = props;
  const [name, setName] = useState("");
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [result, setResult] = useState("");
  const [image, setImage] = useState(null);
  const email = useSelector((state) => state.user.email);
  const [customFields, setCustomFields] = useState([
    { name: "", value: "" },
    { name: "", value: "" },
    { name: "", value: "" },
  ]);

  const handleChangeCustomFieldName = (value, index, isName) => {
    const updatedCustomFields = [...customFields];
    if (isName) {
      updatedCustomFields[index].name = value;
    } else {
      updatedCustomFields[index].value = value;
    }
    setCustomFields(updatedCustomFields);
  };

  const createClick = async () => {
    try {
      const filteredCustomFields = customFields.filter((item) => !!item.name);
      await addCollection(
        email,
        name,
        description,
        theme,
        image,
        filteredCustomFields
      );
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
            <FileInput
              placeholder="Pick file"
              label="Image"
              withAsterisk
              value={image}
              onChange={setImage}
            />
            <Text>Custom fields</Text>
            {Array.from({ length: 3 }).map((_, index) => (
              <Flex gap={10} justify={"space-between"} w={"100%"} key={index}>
                <Input
                  placeholder={`custom field ${index + 1}`}
                  onChange={(e) =>
                    handleChangeCustomFieldName(e.target.value, index, true)
                  }
                />
                <Input
                  key={index}
                  placeholder="value"
                  onChange={(e) =>
                    handleChangeCustomFieldName(e.target.value, index, false)
                  }
                />
              </Flex>
            ))}
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
