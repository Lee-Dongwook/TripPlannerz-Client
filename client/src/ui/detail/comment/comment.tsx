import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Form, Input } from 'antd';

import { Comment } from '@/domain/Comment';
import { postCommentToServer } from '@/application/api/detail/postCommentToServer';

const { TextArea } = Input;

export const CommentList = ({ userName, tripUuid }) => {
  const token = useSelector((state: any) => state.token.token);

  const [review, setReview] = useState<string>('');
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleAddComment = async () => {
    const postToServer = {
      review: review,
      tripUUID: tripUuid,
    };

    const response = await postCommentToServer(token, postToServer);

    if (response) {
      alert('댓글이 등록되었습니다.');
    }
  };

  const handleDeleteCertainComment = (index) => {
    const newCommentList = commentList.filter((comment, idx) => idx !== index);
    setCommentList(newCommentList);

    alert('댓글이 삭제되었습니다.');
  };

  return (
    <div>
      <Form>
        <TextArea rows={3} value={review} onChange={handleReviewChange} />
      </Form>
      <Button onClick={handleAddComment}>댓글 추가</Button>
      {commentList &&
        commentList.map((comment, index) => (
          <div>
            <Card key={index}>
              <p>날짜: {comment.postDate}</p>
              <p>글쓴이: {comment.senderName}</p>
              <p>댓글: {comment.review}</p>
            </Card>
            {comment.senderName === userName ? (
              <Button onClick={() => handleDeleteCertainComment(index)}>
                삭제
              </Button>
            ) : (
              ''
            )}
          </div>
        ))}
    </div>
  );
};
