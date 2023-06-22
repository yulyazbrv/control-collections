import { Drawer, Button, Flex, Title, Input } from "@mantine/core";
import { useState } from "react";
import { updateCollection } from "../../api/collectionApi/updateCollection";

function UpdateCollection(props) {
  const { opened, close, collection } = props;
  const [result, setResult] = useState("");
  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description);
  const [theme, setTheme] = useState(collection.theme);
  const updateClick = async () => {
    try {
      await updateCollection(collection._id, name, description, theme);
      close();
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
        title="Update Collection"
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
            <Title order={2}>Update collection</Title>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              placeholder="Theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
            <Button color="red" radius="lg" uppercase onClick={updateClick}>
              Update
            </Button>
            <Title order={6}>{result}</Title>
          </Flex>
        </Flex>
      </Drawer>
    </>
  );
}

export { UpdateCollection };
