import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello Express!" });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
