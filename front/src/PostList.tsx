import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import { IPost } from './types/IPost';

const PostList = () => {
  const [posts, setPosts] = useState<Record<string, IPost>>({});

  const fetchPosts = async () => {
    const res = await axios.get<Record<string, IPost>>('http://localhost:4000/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map(post => (
    <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
      <div className="card-body d-flex flex-column">
        <h3>{post.title}</h3>
        <CommentList postId={post.id} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  ));

  return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>;
};

export default PostList;
