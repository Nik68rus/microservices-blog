import { useCallback, useEffect, useState } from 'react';
import { IComment } from './types/IComment';
import axios from 'axios';

interface Props {
  postId: string;
}

const CommentList = ({ postId }: Props) => {
  const [comments, setComments] = useState<IComment[]>([]);

  const fetchComments = useCallback(async () => {
    const res = await axios.get<IComment[]>(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data);
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const renderedComments = comments.map(comment => <li key={comment.id}>{comment.content}</li>);

  return <ul className="mb-2">{renderedComments}</ul>;
};

export default CommentList;
