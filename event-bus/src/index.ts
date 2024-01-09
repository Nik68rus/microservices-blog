import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { IEvent } from './types/IEvent';

const app = express();
app.use(bodyParser.json());
const PORT = 4005;

const events: IEvent[] = [];

app.post('/events', (req, res) => {
  const event = req.body;
  console.log(event);
  events.push(event);

  axios.post('http://localhost:4000/events', event).catch(err => console.log(err));
  axios.post('http://localhost:4001/events', event).catch(err => console.log(err));
  axios.post('http://localhost:4002/events', event).catch(err => console.log(err));
  axios.post('http://localhost:4003/events', event).catch(err => console.log(err));

  return res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
