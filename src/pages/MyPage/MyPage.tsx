import React, { useState, useEffect } from "react";
import "./MyPage.css";

interface UserInfoData {
  email: string;
  name: string;
}

interface DuelRecord {
  opponent: string;
  result: string;
}

interface ScoresData {
  praiseScore: number;
  answerCount: number;
  duelScore: number;
}

const UserInfo: React.FC<{
  data: UserInfoData | null;
  onUpdateName: (name: string) => void;
}> = ({ data, onUpdateName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(data ? data.name : "");

  useEffect(() => {
    if (data) {
      setName(data.name);
    }
  }, [data]);

  const handleUpdate = async () => {
    await onUpdateName(name);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <h2>가입 정보</h2>
      <p>이메일: {data ? data.email : "Loading..."}</p>
      {isEditing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn" onClick={handleUpdate}>
            완료
          </button>
        </>
      ) : (
        <>
          <p>이름: {data ? data.name : "Loading..."}</p>
          <button className="btn" onClick={() => setIsEditing(true)}>
            이름변경
          </button>
        </>
      )}
    </div>
  );
};

const DuelRecords: React.FC<{ records: DuelRecord[] }> = ({ records }) => {
  return (
    <div className="card">
      <h2>1대1 대결 전적</h2>
      {records && records.length > 0 ? (
        <ul>
          {records.map((record, index) => (
            <li key={index}>
              상대: {record.opponent}, 결과: {record.result}
            </li>
          ))}
        </ul>
      ) : (
        <p>전적이 없습니다.</p>
      )}
    </div>
  );
};

const Scores: React.FC<{ data: ScoresData | null }> = ({ data }) => {
  return (
    <div className="card">
      <h2>점수 조회</h2>
      {data ? (
        <>
          <p>칭찬: {data.praiseScore}</p>
          <p>답변: {data.answerCount}</p>
          <p>1대1 대결: {data.duelScore}</p>
        </>
      ) : (
        <p>점수 정보가 없습니다.</p>
      )}
    </div>
  );
};

const MyPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
  const [duelRecords, setDuelRecords] = useState<DuelRecord[]>([]);
  const [scores, setScores] = useState<ScoresData | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/userInfo?email=user@example.com");
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data: UserInfoData = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userInfo) {
        try {
          const [recordsResponse, scoresResponse] = await Promise.all([
            fetch(`/api/duelRecords?username=${userInfo.name}`),
            fetch(`/api/scores?username=${userInfo.name}`),
          ]);

          if (!recordsResponse.ok || !scoresResponse.ok) {
            throw new Error("Failed to fetch user details");
          }

          const duelRecordsData: DuelRecord[] = await recordsResponse.json();
          const scoresData: ScoresData = await scoresResponse.json();

          setDuelRecords(duelRecordsData);
          setScores(scoresData);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [userInfo]);

  const updateUserName = async (name: string) => {
    if (userInfo) {
      try {
        const response = await fetch("/api/updateName", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userInfo.email, name }),
        });

        if (!response.ok) {
          throw new Error("Failed to update name");
        }

        setUserInfo((prev) => (prev ? { ...prev, name } : prev));
      } catch (error) {
        console.error("Error updating user name:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>마이페이지</h1>
      <UserInfo data={userInfo} onUpdateName={updateUserName} />
      <DuelRecords records={duelRecords} />
      <Scores data={scores} />
    </div>
  );
};

export default MyPage;
