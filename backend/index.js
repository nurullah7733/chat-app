require("dotenv").config();
const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket/socket");

const server = http.createServer(app);

initializeSocket(server);

// eslint-disable-next-line no-undef
server.listen(process.env.PORT || 40000, () => {
  // eslint-disable-next-line no-undef
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
