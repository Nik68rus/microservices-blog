import axios from 'axios';
import { useState } from 'react';

interface Props {
  readonly postId: string;
}

const CommentCreate = ({ postId }: Props) => {
  const [content, setContent] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
    setContent('');
  };

  return (
    <div className="mt-auto">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New comment</label>
          <input
            type="text"
            className="form-control"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
