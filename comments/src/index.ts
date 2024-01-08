import express, { Router, Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import { IComment } from './types/IComment';
import axios from 'axios';

interface PostRequest extends Request {
  body: {
    content: string;
  };
}

const app = express();
const router = Router();
const eventsRouter = Router();
const PORT = 4001;

app.use(bodyParser.json());
app.use(cors());
app.use('/', eventsRouter);
app.use('/posts', router);

const commentsByPostId: Record<string, IComment[]> = {};

router.get('/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

router.get('/comments', (req, res) => {
  res.send(commentsByPostId);
});

router.post('/:id/comments', (req: PostRequest, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });
  res.status(201).send(comments);
});

eventsRouter.post('/events', (req, res) => {
  console.log('Received Event', req.body);
  res.status(200).send({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
