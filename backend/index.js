const app = require("./app");

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${process.env.PORT}`);
  }
});
