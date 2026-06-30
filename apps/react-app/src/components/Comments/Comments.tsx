import React, { useEffect, useState } from "react";
import { CommentResponse, NewComment } from "../../types";
import CommentCard from "../CommentCard/CommentCard";
import NewCommentForm from "../Form/CommentForm";
import { Title, Container, FormContainer } from "./Comments.styles";

interface CommentsProps {
  comments: CommentResponse[];
}

function Comments({ comments }: CommentsProps) {
  const [currComments, setCurrlComments] = useState<CommentResponse[]>(comments || []);

  useEffect(() => {
    setCurrlComments(comments || []);
  }, [comments]);

  const handleAdd = (data: NewComment) => {
    const newComment: CommentResponse = {
      _id: "testing",
      author: data.author,
      content: data.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };
    setCurrlComments((prev) => [...prev, newComment]);
  };

  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>

      {currComments.map((c) => (
        <CommentCard key={c._id} comment={c} />
      ))}

      <FormContainer item sm={8}>
        <NewCommentForm onAdd={handleAdd} />
      </FormContainer>
    </Container>
  );
}

export default Comments;
