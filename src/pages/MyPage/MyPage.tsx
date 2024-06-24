import React, { useState, useEffect } from "react";
import "./MyPage.css";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { findAllBattleRank, findAllPraiseRank } from "../../store/slices/memberSlice";

interface UserInfoData {
  id: string;
  name: string;
  nick: string;
  email: string;
  bio: string;
  birthDate: string;
}

interface DuelRecord {
  opponent: string;
  result: string;
}

interface ScoresData {
  praiseScore: number;
  answerCount: number;
  duelScore: number;
  overallScore: number;
  problemScore: number;
  solutionScore: number;
}

const UserInfo: React.FC<{
  data: UserInfoData | null;
  onUpdateUserInfo: (updatedData: Partial<UserInfoData>) => void;
}> = ({ data, onUpdateUserInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserInfoData>>({});

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    await onUpdateUserInfo(formData);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <h2>
        가입 정보
        {!isEditing && (
          <button
            className="btn right-align"
            onClick={() => setIsEditing(true)}
          >
            정보 변경
          </button>
        )}
      </h2>
      {data ? (
        <>
          <p>ID: {data.id}</p>
          <p>이메일: {data.email}</p>
          <p>이름: {data.name}</p>
          {isEditing ? (
            <>
              <label>닉네임: </label>
              <input
                type="text"
                name="nick"
                value={formData.nick || ""}
                onChange={handleChange}
              />
              <label>생년월일: </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate || ""}
                onChange={handleChange}
              />
              <label>자기소개: </label>
              <input
                type="text"
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
              />
              <button className="btn" onClick={handleUpdate}>
                완료
              </button>
            </>
          ) : (
            <>
              <p>닉네임: {data.nick}</p>
              <p>생년월일: {data.birthDate}</p>
              <p>자기소개: {data.bio}</p>
            </>
          )}
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

const DuelRecords: React.FC<{ records: DuelRecord[] }> = ({ records }) => {
  const { battleInfo } = useAppSelector(state => state.battle);
  return (
    <div className="card">
      <div className='title'>최근 전적</div>
      <List>
        {battleInfo.battleRecords.map((battle, index) => {
          if (battle.givenUser == "" || !battleInfo.battleRecords) return <div>최근 전적이 없습니다.</div>
          if (index > 4) return
          return (
            <div>{`${battle.givenUser} VS ${battle.receivedUser} ${battle.result}`}</div>
          )
        })}
      </List>
    </div>
  );
};

const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 70%;
    border-radius: 5px;
    padding: 40px 10px 0px 10px;

    & div{
        font-size: 20px;
        font-weight: bold;
        width: 100%;
        height: 40px;
        text-align: center;
    }
`

const Scores: React.FC<{ data: ScoresData | null }> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { PraiseRank, BattleRank, loginedMember } = useAppSelector(state => state.member);
  const [praise, setPraise] = useState<number>()
  const [battle, setBattle] = useState<number>()
  const [total, setTotal] = useState<number>()
  useEffect(() => {
    dispatch(findAllPraiseRank())
    dispatch(findAllBattleRank())

  }, [])

  useEffect(() => {
    const praiseRank = PraiseRank.find(praise => praise.loginId == loginedMember.loginId)
    const battleRank = BattleRank.find(battle => battle.loginId == loginedMember.loginId)
    if (praiseRank && battleRank) {
      setPraise(praiseRank.type.score)
      setBattle(battleRank.type.score)
      setTotal(praiseRank.type.score + battleRank.type.score)
    }
  }, [PraiseRank, BattleRank])
  return (
    <div className="card">
      <h2>내 점수</h2>
      {data ? (
        <>
          <p>총 점수: {total}</p>
          <p>칭찬 점수: {praise}</p>
          <p>대결 점수: {battle}</p>
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
    const savedUserInfo = localStorage.getItem("userInfo");
    const savedDuelRecords = localStorage.getItem("duelRecords");
    const savedScores = localStorage.getItem("scores");

    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    } else {
      setUserInfo({
        id: "user123",
        name: "김구름",
        nick: "구르미",
        email: "goormi@example.com",
        bio: "안녕하세요! 저는 구르마입니다.",
        birthDate: "1999-01-01",
      });
    }

    if (savedDuelRecords) {
      setDuelRecords(JSON.parse(savedDuelRecords));
    } else {
      setDuelRecords([
        { opponent: "김ㅇㅇ", result: "승" },
        { opponent: "이ㅇㅇ", result: "패" },
        { opponent: "박ㅇㅇ", result: "무승부" },
      ]);
    }

    if (savedScores) {
      setScores(JSON.parse(savedScores));
    } else {
      setScores({
        overallScore: 1234,
        praiseScore: 120,
        answerCount: 45,
        duelScore: 300,
        problemScore: 50,
        solutionScore: 80,
      });
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    if (duelRecords.length > 0) {
      localStorage.setItem("duelRecords", JSON.stringify(duelRecords));
    }
  }, [duelRecords]);

  useEffect(() => {
    if (scores) {
      localStorage.setItem("scores", JSON.stringify(scores));
    }
  }, [scores]);

  const updateUserInfo = async (updatedData: Partial<UserInfoData>) => {
    if (userInfo) {
      const updatedUserInfo = { ...userInfo, ...updatedData };
      setUserInfo(updatedUserInfo);
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    }
  };

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />

      <UserInfo data={userInfo} onUpdateUserInfo={updateUserInfo} />
      <DuelRecords records={duelRecords} />
      <Scores data={scores} />
    </div>
  );
};

export default MyPage;
