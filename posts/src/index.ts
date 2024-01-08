import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import { IPost } from './types/IPost';
import cors from 'cors';
import axios from 'axios';

const app = express();
const router = Router();
const eventsRouter = Router();
const PORT = 4000;
app.use(bodyParser.json());
app.use(cors());
app.use('/', eventsRouter);
app.use('/posts', router);

const posts: Record<string, IPost> = {};

router.get('/', (req, res) => {
  res.send(posts);
});

router.post('/', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

router.delete('/:postId', (req, res) => {
  const { postId } = req.params;
  if (posts[postId]) {
    delete posts[postId];
    res.status(200).send('deleted');
  } else {
    res.status(404).send('not found');
  }
});

eventsRouter.post('/events', (req, res) => {
  console.log('Received Event', req.body);
  res.status(200).send({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
