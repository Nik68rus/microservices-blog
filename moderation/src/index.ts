import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { IComment } from './types/IComment';

const app = express();
const PORT = 4003;
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  console.log(req.body);
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const comment = data as IComment;
    const status = comment.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: { id: comment.id, content: comment.content, postId: comment.postId, status },
    });
  }

  res.send({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
