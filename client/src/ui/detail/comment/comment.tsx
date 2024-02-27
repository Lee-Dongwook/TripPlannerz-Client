import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import { Button, Card, Form, Input } from 'antd';
import * as _ from 'lodash';

import type { Comment } from '@/domain/Comment';

import { getDetailTripInfo } from '@/application/api/detail/getDetailTripInfo';
import { postCommentToServer } from '@/application/api/detail/postCommentToServer';
import { CommentProp } from '@/ui/detail/comment/commentProp.types';

const { TextArea } = Input;

export const CommentList = ({ tripUUID }: CommentProp) => {
  const token = useSelector((state: any) => state.token.token);
  const location = useLocation();
  const arr = location.pathname.split('/');

  const [review, setReview] = useState<string>('');

  const handleGetCommentList = useCallback(async () => {
    const response = await getDetailTripInfo(token, arr);
    return response.data.commentList || [];
  }, [token, arr]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const { data: commentList } = useQuery({
    queryKey: ['comments'],
    queryFn: handleGetCommentList,
  });

  const mutation = useMutation({
    mutationFn: (postToServer: any) => {
      return postCommentToServer(token, postToServer);
    },
  });

  const handleAddComment = async () => {
    const postToServer = {
      review: review,
      tripUUID: tripUUID,
    };

    mutation.mutate(postToServer, {
      onSuccess: () => {
        alert('댓글이 등록되었습니다.');
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
        commentList.map((comment: Comment, idx) => (
          <div>
            <Card key={idx}>
              <p>날짜: {comment.postDate}</p>
              <p>글쓴이: {comment.senderName}</p>
              <p>댓글: {comment.review}</p>
            </Card>
          </div>
        ))}
    </div>
  );
};
