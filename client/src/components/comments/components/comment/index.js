import { Card, Flex, Text, Title } from "@mantine/core";
import { IconMessageDots } from "@tabler/icons-react";

const Comment = (props) => {
  const { comment } = props;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w={"100%"}>
      <Flex direction={"row"} justify={"flex-start"} >
        <IconMessageDots></IconMessageDots>
        <Flex direction={"column"}>
          <Flex wrap={"wrap"}>
            <Title order={6}>{comment.user.email} | </Title>
            <Title order={6}> {comment.creation_date}</Title>
          </Flex>
          <Text fz="md">{comment.message}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export { Comment };
