import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Button, Card, Form, Input } from 'antd';

import type { Comment } from '@/domain/Comment';

import { getDetailTripInfo } from '@/application/api/detail/getDetailTripInfo';
import { postCommentToServer } from '@/application/api/detail/postCommentToServer';
import { CommentProp } from '@/ui/detail/comment/commentProp.types';

const { TextArea } = Input;

export const CommentList = ({ tripUUID }: CommentProp) => {
  const token = useSelector((state: any) => state.token.token);
  const location = useLocation();
  const arr = location.pathname.split('/');
  const queryClient = useQueryClient();

  const [review, setReview] = useState<string>('');

  const handleGetCommentList = async () => {
    const response = await getDetailTripInfo(token, arr);

    if (response.data) {
      return response.data.commentList;
    }
    return [];
  };

  const { data: commentList } = useQuery(['comments', tripUUID], () => {
    return handleGetCommentList();
  });

  const mutation = useMutation(
    (postToServer) => postCommentToServer(token, postToServer),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          ['comments', tripUUID],
          (oldComments: Comment[]) => [...oldComments, data]
        );
      },
    }
  );

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleAddComment = async () => {
    const postToServer = {
      review: review,
      tripUUID: tripUUID,
    };

    mutation.mutate(postToServer, {
      onSuccess: async () => {
        const response = await postCommentToServer(token, postToServer);

        if (response) {
          alert('댓글이 등록되었습니다.');
        }
      },
    });
  };

  return (
    <div>
      <Form>
        <TextArea rows={3} value={review} onChange={handleReviewChange} />
      </Form>
      <Button onClick={handleAddComment} loading={mutation.isLoading}>
        댓글 추가
      </Button>
      {console.log(commentList)}
      {commentList &&
        commentList.map((comment, index) => (
          <div>
            <Card key={index}>
              <p>날짜: {comment.postDate}</p>
              <p>글쓴이: {comment.senderName}</p>
              <p>댓글: {comment.review}</p>
            </Card>
          </div>
        ))}
    </div>
  );
};
