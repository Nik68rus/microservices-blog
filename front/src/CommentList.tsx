import { IComment } from './types/IComment';

interface Props {
  comments: IComment[];
}

const CommentList = ({ comments }: Props) => {
  const renderCommentContent = (comment: IComment) => {
    if (comment.status === 'pending') return 'Comment awaiting for moderation';
    if (comment.status === 'rejected') return 'Comment was rejected';
    return comment.content;
  };

  const renderedComments = comments.map(comment => (
    <li key={comment.id}>{renderCommentContent(comment)}</li>
  ));

  return <ul className="mb-2">{renderedComments}</ul>;
};

export default CommentList;
