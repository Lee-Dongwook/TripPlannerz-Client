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
    <div className="space-y-6">
      {comments.length === 0 ? (
        <p className="text-gray-500 text-center">아직 댓글이 없습니다.</p>
      ) : (
        comments.map((comment, idx) => (
          <div
            key={idx}
            className="bg-gray-100 shadow-md rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">
                  날짜: {comment.postDate}
                </p>
                <p className="font-semibold text-gray-700">
                  글쓴이: {comment.senderName}
                </p>
              </div>
              {comment.senderName === userName && (
                <button
                  onClick={() => onDelete(idx)}
                  className="text-red-500 text-sm font-medium hover:underline"
                >
                  삭제
                </button>
              )}
            </div>
            <p className="text-gray-700">{comment.review}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
