import express from 'express';

const PORT = 8000;
const app = express();

app.use('/api', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'not found' });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
