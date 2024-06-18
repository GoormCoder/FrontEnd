// index.js

const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;

// CORS 설정
app.use(cors());

// 정적 파일 제공 설정
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: "13.124.201.219",
  user: "GoormCoder", // MySQL 사용자 이름
  password: "52539", // MySQL 비밀번호
  database: "MySQL", // MySQL 데이터베이스 이름
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 프로필 사진 업로드 엔드포인트
app.post("/api/upload-avatar", upload.single("avatar"), (req, res) => {
  const userId = 1; // 실제 애플리케이션에서는 인증된 사용자 ID를 사용합니다
  const avatarUrl = `/uploads/${req.file.filename}`;

  db.query(
    "UPDATE users SET avatar = ? WHERE id = ?",
    [avatarUrl, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }
      res.json({ avatar: avatarUrl });
    }
  );
});

// 사용자 정보 API 엔드포인트
app.get("/api/user", (req, res) => {
  const userId = 1; // 실제 애플리케이션에서는 인증된 사용자 ID를 사용합니다
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// 1대1 대결 전적 API 엔드포인트
app.get("/api/match-records", (req, res) => {
  const userId = 1;
  db.query(
    "SELECT * FROM match_records WHERE userId = ?",
    [userId],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// 통계 정보 API 엔드포인트
app.get("/api/stats", (req, res) => {
  const userId = 1;
  db.query("SELECT * FROM stats WHERE userId = ?", [userId], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
