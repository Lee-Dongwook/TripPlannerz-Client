import React from "react";
import { type Comment } from "@/types/Comment";

interface CommentsProps {
  comments: Comment[];
  userName: string;
  onDelete: (index: number) => void;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  userName,
  onDelete,
}) => {
  return (
    <>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment, idx) => (
          <div key={idx}>
            <p>날짜: {comment.postDate}</p>
            <p>글쓴이: {comment.senderName}</p>
            <p>댓글 : {comment.review}</p>
            {comment.senderName === userName && (
              <button onClick={() => onDelete(idx)}>삭제</button>
            )}
          </div>
        ))
      )}
    </>
  );
};

export default Comments;
