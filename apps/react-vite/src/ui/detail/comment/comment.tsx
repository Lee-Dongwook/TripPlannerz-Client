import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from 'react-query';

import { getDetailTripInfo } from '@/application/api/detail/getDetailTripInfo';
import { postCommentToServer } from '@/application/api/detail/postCommentToServer';
import { CommentProp } from '@/ui/detail/comment/commentProp.types';

export const CommentList = ({ tripUUID }: CommentProp) => {
  const token = useSelector((state: any) => state.token.token);

  const [review, setReview] = useState<string>('');

  const handleGetCommentList = useCallback(async () => {
    const response = await getDetailTripInfo(token, [tripUUID]);
    return response.data.commentList || [];
  }, [token, tripUUID]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const { data: commentList } = useQuery(['comments', tripUUID], handleGetCommentList);

  const mutation = useMutation((postToServer: any) => postCommentToServer(token, postToServer));

  const handleAddComment = () => {
    mutation.mutate(
      { review, tripUUID },
      {
        onSuccess: () => {
          alert('댓글이 등록되었습니다.');
        },
      }
    );
  };

  return (
    <div>
      <div className='mb-4'>
        <textarea
          className='textarea textarea-bordered w-full'
          rows={3}
          value={review}
          onChange={handleReviewChange}
        />
      </div>
      <button className={`btn ${mutation.isLoading ? 'loading' : ''}`} onClick={handleAddComment}>
        댓글 추가
      </button>
      {commentList &&
        commentList.map((comment, idx) => (
          <div key={idx} className='mt-4'>
            <div className='card bordered'>
              <div className='card-body'>
                <p>날짜: {new Date(comment.postDate).toLocaleDateString()}</p>
                <p>글쓴이: {comment.senderName}</p>
                <p>댓글: {comment.review}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
