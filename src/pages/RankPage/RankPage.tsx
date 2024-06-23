import React, { useState, useEffect } from "react";
import { User } from "../ChatFriendPage/types";
import TopThree from "./components/TopThree";
import RankTable from "./components/RankTable";
import styled from "styled-components";
import { RankType } from "./types";

const RankPage = () => {
  const [rankType, setRankType] = useState<string>(RankType.PRAISE);

  return (
    <RankPageContainer>
      <RankTableContainer>
        <h1>랭킹 페이지</h1>
        <Navigator>
          {rankType == RankType.PRAISE ?
            <button className="clicked">칭찬 랭킹</button>
            :
            <button className="non-clicked" onClick={() => setRankType(RankType.PRAISE)}>칭찬 랭킹</button>
          }
          {rankType == RankType.BATTLE ?
            <button className="clicked" >대결 랭킹</button>
            :
            <button className="non-clicked" onClick={() => setRankType(RankType.BATTLE)}>대결 랭킹</button>
          }
          {rankType == RankType.SOLVED ?
            <button className="clicked">풀이 랭킹</button>
            :
            <button className="non-clicked" onClick={() => setRankType(RankType.SOLVED)}>풀이 랭킹</button>
          }
        </Navigator>
        <RankTable rankType={rankType} />
      </RankTableContainer>
    </RankPageContainer>
  );
};

export default RankPage;

const RankPageContainer = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
      @media only screen and (max-width: 430px) {
        /* width: 200px; */
        
    }
`

const RankTableContainer = styled.div`
  width:810px;
    & button {
      width: 270px;
      height: 40px;
      margin: 0 0 -1px 0px;
      border-style: none;
      border-radius: 10px 10px 0 0;
      border: 1px solid lightgray;
      background-color: white;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }

    & .clicked {
      border-bottom: 1px solid white;
    }

    & .non-clicked{
      border-bottom: 1px solid lightgray;
      background-color: #90c7f7a8;
    }
      @media only screen and (max-width: 430px) {
        width: 400px;
        
    }
`

const Navigator = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
