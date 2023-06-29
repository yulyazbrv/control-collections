import { Button, Flex, Textarea, Title } from "@mantine/core";
import { useComments } from "../../core/useComments";
import { Comment } from "./components/comment";
import { useEffect, useState } from "react";
import { addComment } from "../../api/commentApi/addComment";
import { useSelector } from "react-redux";
import "./style.css";

const Comments = (props) => {
  const { item } = props;
  console.log("id ", item._id)

  const { data: comments, isFetching: isLoading } = useComments(item._id);
  const [result, setResult] = useState("");
  const [textComment, setTextComment] = useState("");
  const email = useSelector((state) => state.user.email);
  const sendComment = async () => {
    try {
      await addComment(email, item._id, textComment);
      setTextComment("");
      setResult("Succesfully");
    } catch (e) {
      setResult(e.message);
    }
  };
  return (
    <Flex
      direction={"column"}
      gap={5}
      align={"flex-start"}
      w={"100%"}
      className="comments-wrapper"
    >
      {comments ? (
        comments.map((comment, index) => (
          <Comment key={index} comment={comment}></Comment>
        ))
      ) : (
        <Title order={5}>No comments yet!</Title>
      )}
      <Textarea
        w={"100%"}
        placeholder="Your comment"
        label="Your comment"
        withAsterisk
        onChange={(e) => setTextComment(e.currentTarget.value)}
      />
      <Button color="red" radius="lg" uppercase onClick={sendComment}>
        Send
      </Button>
      <Title order={6}>{result}</Title>
    </Flex>
  );
};

export { Comments };
