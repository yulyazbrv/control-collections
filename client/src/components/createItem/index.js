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

function CreateItem(props) {
  const { opened, close, refetch } = props;
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [result, setResult] = useState("");
  const { data: tagsData } = useTags();
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
        title="Create item"
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
            <Title order={2}>Create item</Title>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Autocomplete
              value={tags}
              onChange={setTags}
              placeholder="#super #love #book"
              data={
                tagsData
                  ? tagsData.map((tag, index) => ({
                      value: tag.name,
                      key: index,
                    }))
                  : []
              }
            />
            {/* <Input
              placeholder="#super #love #book"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            /> */}
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

export { CreateItem };
