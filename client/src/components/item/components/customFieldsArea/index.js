import { Flex, Text } from "@mantine/core";
import { useCollectionFields } from "../../../../core/useCollectionFields";

const CustomFieldsArea = (props) => {
  const { item } = props;
  const { data: collectionFields } = useCollectionFields(
    item.itemCollection._id
  );

  return (
    <Flex direction={"column"}>
      {collectionFields && collectionFields.length !== 0 ? (
        collectionFields.map((field, index) => (
          <Flex key={index}>
            <Text fw={700} mr={5}>
              {index + 1}.
            </Text>
            <Text>{field.name} :</Text>
            <Text ml={5}>{field.value}</Text>
          </Flex>
        ))
      ) : (
        <Flex>
          <Text>No custom fields yet</Text>
        </Flex>
      )}
    </Flex>
  );
};

export { CustomFieldsArea };
