import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

interface User {
  id: string;
  name: string;
  nick: string;
  email: string;
  overallScore: number;
  praiseScore: number;
  solveScore: number;
  battleScore: number;
}

const dummyUsers: User[] = [
  {
    id: "1",
    name: "김철수",
    nick: "철수1",
    email: "chulsoo1@example.com",
    overallScore: 950,
    praiseScore: 300,
    solveScore: 500,
    battleScore: 150,
  },
  // 더미 유저 데이터 추가...
];

// 유저 정보 가져오기
app.get("/api/userInfo", (req: Request, res: Response) => {
  const email = req.query.email as string;
  const user = dummyUsers.find((user) => user.email === email);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// 유저 대결 기록 가져오기
app.get("/api/duelRecords", (req: Request, res: Response) => {
  const username = req.query.username as string;
  // 더미 대결 기록 데이터
  const duelRecords = [
    { opponent: "Opponent1", result: "Win" },
    { opponent: "Opponent2", result: "Loss" },
  ];
  res.json(duelRecords);
});

// 유저 점수 가져오기
app.get("/api/scores", (req: Request, res: Response) => {
  const username = req.query.username as string;
  const user = dummyUsers.find((user) => user.name === username);
  if (user) {
    const scores = {
      praiseScore: user.praiseScore,
      answerCount: user.solveScore,
      duelScore: user.battleScore,
    };
    res.json(scores);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// 유저 이름 업데이트
app.post("/api/updateName", (req: Request, res: Response) => {
  const { email, name } = req.body;
  const user = dummyUsers.find((user) => user.email === email);
  if (user) {
    user.name = name;
    res.json({ message: "Name updated successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
