import { Drawer, Button, Flex, Title, Input } from "@mantine/core";
import { useState } from "react";
import { addCollection } from "../../api/collectionApi/addCollection";
import { useSelector } from "react-redux";

function CreateCollection(props) {
  const { opened, close } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [result, setResult] = useState("");
  const email = useSelector((state) => state.user.email)
  const createClick = async () => {
    try {
      await addCollection(email, name, description, theme);
      close();
    } catch (e) {
      setResult(e.message);
    }
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Create Collection"
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
            <Title order={2}>Create collection</Title>
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
            <Button color="red" radius="lg" uppercase onClick={createClick}>
              Create
            </Button>
            <Title order={6}>{result}</Title>
          </Flex>
        </Flex>
      </Drawer>
    </>
  );
}

export { CreateCollection };
