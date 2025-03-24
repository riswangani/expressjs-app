import express from 'express';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: 'johndoe', FullName: 'John Doe' },
  { id: 2, username: 'janedoe', FullName: 'Jane Doe' },
  { id: 3, username: 'aisha', FullName: 'Aisha Jackson' },
  { id: 4, username: 'tina', FullName: 'Tina Turner' },
  { id: 5, username: 'michael', FullName: 'Michael Jackson' },
  { id: 6, username: 'prince', FullName: 'Prince Rogers Nelson' },
  { id: 7, username: 'whitney', FullName: 'Whitney Houston' },
];

app.get('/', (req, res) => {
  res.status(201).send({ msg: 'Hello World!' });
});

app.get('/api/users', (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  return res.send(mockUsers);
});

app.post('/api/users', (req, res) => {
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.get('/api/users/:id', (req, res) => {
  console.log(req.params);
  const parsedId = parseInt(req.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) {
    res.status(400).send({ msg: 'Bad Request. Invalid ID' });
  }

  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.get('/api/products', (req, res) => {
  res.send([
    { id: 123, name: 'chicken  breast', price: 5.99 },
    { id: 124, name: 'salmon', price: 10.99 },
    { id: 125, name: 'beef', price: 8.99 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.put('/api/users/:id', (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return res.sendStatus(204);
});

app.patch('/api/users/:id', (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(204);
});
