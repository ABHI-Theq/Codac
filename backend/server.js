import server from './app.js';

const PORT = process.env.PORT || 5050;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});