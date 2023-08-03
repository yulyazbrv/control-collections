import { Button, Flex, Loader, Textarea, Title } from "@mantine/core";
import { useComments } from "../../core/useComments";
import { Comment } from "./components/comment";
import { useState } from "react";
import { addComment } from "../../api/commentApi/addComment";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./style.css";

const Comments = (props) => {
  const { item, setCountOfComments } = props;
  const { t } = useTranslation();
  const { data: comments, isLoading, refetch } = useComments(item._id);
  const [result, setResult] = useState("");
  const [textComment, setTextComment] = useState("");
  const email = useSelector((state) => state.user.email);

  const sendComment = async () => {
    try {
      await addComment(email, item._id, textComment);
      setTextComment("");
      setResult("Succesfully");
      setCountOfComments(item.comments.length + 1);
      refetch();
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
      {isLoading && <Loader></Loader>}
      {comments ? (
        comments.map((comment, index) => (
          <Comment key={index} comment={comment}></Comment>
        ))
      ) : (
        <Title order={6}>no comments yet</Title>
      )}
      <Textarea
        w={"100%"}
        placeholder={t("your comment")}
        label={t("your comment")}
        withAsterisk
        onChange={(e) => setTextComment(e.currentTarget.value)}
      />
      <Button color="red" radius="lg" onClick={sendComment}>
        {t("send")}
      </Button>
      <Title order={6}>{result}</Title>
    </Flex>
  );
};

export { Comments };
