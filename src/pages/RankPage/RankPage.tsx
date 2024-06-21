import React, { useState, useEffect } from "react";
import "./RankPage.css";

interface User {
  id: number;
  name: string;
  score: number;
  praiseScore: number;
  answerCount: number;
  image: string;
  correctProblems: number;
  correctRate: number;
}

interface TopThreeProps {
  topUsers: User[];
  rankingType: string;
}

const TopThree: React.FC<TopThreeProps> = ({ topUsers, rankingType }) => {
  return (
    <div className="top-three">
      {topUsers.map((user, index) => (
        <div key={user.id} className={`top-user rank-${index + 1}`}>
          <img
            className="user-image"
            src={user.image || "https://via.placeholder.com/100"}
            alt={`${index + 1}등`}
          />
          <p>{user.name}</p>
          {rankingType === "score" && <p>점수: {user.score}</p>}
          {rankingType === "praise" && <p>칭찬 점수: {user.praiseScore}</p>}
          {rankingType === "answer" && <p>답변 개수: {user.answerCount}</p>}
        </div>
      ))}
    </div>
  );
};

interface RankingTableProps {
  users: User[];
  rankingType: string;
}

const RankingTable: React.FC<RankingTableProps> = ({ users, rankingType }) => {
  return (
    <table className="ranking-table">
      <thead>
        <tr>
          <th>등수</th>
          <th>아이디</th>
          {rankingType === "score" && (
            <>
              <th>맞은 문제</th>
              <th>정답 비율</th>
              <th>점수</th>
            </>
          )}
          {rankingType === "praise" && <th>칭찬 점수</th>}
          {rankingType === "answer" && <th>답변 개수</th>}
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 4}</td>
            <td>{user.name}</td>
            {rankingType === "score" && (
              <>
                <td>{user.correctProblems}</td>
                <td>{user.correctRate}%</td>
                <td>{user.score}</td>
              </>
            )}
            {rankingType === "praise" && <td>{user.praiseScore}</td>}
            {rankingType === "answer" && <td>{user.answerCount}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const RankPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [rankingType, setRankingType] = useState<string>("score");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users"); // API 엔드포인트 설정
        const data: User[] = await response.json();
        console.log("Fetched users:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggleRanking = () => {
    let nextRankingType: string;
    if (rankingType === "score") {
      nextRankingType = "praise";
    } else if (rankingType === "praise") {
      nextRankingType = "answer";
    } else {
      nextRankingType = "score";
    }

    setRankingType(nextRankingType);

    const sortedData = users.sort((a, b) => {
      if (nextRankingType === "score") {
        return b.score - a.score;
      } else if (nextRankingType === "praise") {
        return b.praiseScore - a.praiseScore;
      } else {
        return b.answerCount - a.answerCount;
      }
    });
    setUsers([...sortedData]);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>랭킹 페이지</h1>
        <button className="toggle-button" onClick={handleToggleRanking}>
          {rankingType === "score"
            ? "칭찬 랭킹"
            : rankingType === "praise"
            ? "답변 랭킹"
            : "점수 랭킹"}
        </button>
      </div>
      <TopThree topUsers={users.slice(0, 3)} rankingType={rankingType} />
      <RankingTable users={users.slice(3)} rankingType={rankingType} />
    </div>
  );
};

export default RankPage;
