import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "https://placeimg.com/64/64/1",
      name: "홍길동",
      birthday: "961112",
      gender: "남자",
      job: "대학생",
    },
    {
      id: 2,
      image: "https://placeimg.com/64/64/2",
      name: "정소철",
      birthday: "901021",
      gender: "남자",
      job: "프로그래머",
    },
    {
      id: 3,
      image: "https://placeimg.com/64/64/3",
      name: "김희소",
      birthday: "920208",
      gender: "여자",
      job: "회계사",
    },
  ]);
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
