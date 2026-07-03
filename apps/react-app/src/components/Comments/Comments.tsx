import React, { useEffect, useState } from "react";
import { Comment, CreateCommentPayload, NewComment } from "../../types";
import CommentCard from "../CommentCard/CommentCard";
import NewCommentForm from "../Form/CommentForm";
import { Title, Container, FormContainer } from "./Comments.styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../api";

interface CommentsProps {
  comments: Comment[];
  postId: string;
}

function Comments({ comments, postId }: CommentsProps) {
  const [currComments, setCurrComments] = useState<Comment[]>(comments || []);
  const queryClient = useQueryClient();

  const commentMutation = useMutation<void, unknown, CreateCommentPayload>({
    mutationFn: postComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['posts']
      });
    }
  });

  useEffect(() => {
    setCurrComments(comments);
  }, [comments]);

  const handleAdd = (data: NewComment) => {
    const commentPayload: CreateCommentPayload = { id: postId, author: data.author, content: data.content };
    const now = new Date().toISOString();
    const localComment: Comment = {
      id: String(Date.now()),
      author: data.author,
      content: data.content,
      post_id: postId,
      createdAt: now,
      updatedAt: now,
    };

    commentMutation.mutate(commentPayload, {
      onSuccess: () => {
        setCurrComments((prev) => [...prev, localComment]);
      }
    });
  };

  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>

      {currComments.map((c) => (
        <CommentCard key={c.id} comment={c} />
      ))}

      <FormContainer item sm={8}>
        <NewCommentForm onAdd={handleAdd} />
      </FormContainer>
    </Container>
  );
}

export default Comments;
