import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { IPost, IPostWithComments } from './types/IPost';
import { IPostComment } from './types/IComment';
import axios from 'axios';
import { IEvent } from './types/IEvent';

const app = express();
const PORT = 4002;
app.use(bodyParser.json());
app.use(cors());

const posts: Record<string, IPostWithComments> = {};

const handleEvent = (type: string, data: any) => {
  if (type === 'PostCreated') {
    const { id, title } = data as IPost;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data as IPostComment;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data as IPostComment;
    const comment = posts[postId].comments.find(c => c.id === id);
    if (!comment) return;
    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ status: 'OK' });
});

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);

  const res = await axios.get<IEvent[]>('http://localhost:4005/events');
  for (let event of res.data) {
    console.log('Processing event:', event.type);
    handleEvent(event.type, event.data);
  }
});
