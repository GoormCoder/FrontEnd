import React from 'react'
import { User } from '../../ChatFriendPage/types';


const TopThree = () => {
    return (
        <div className="top-three">
            TopThree
            {/* {topUsers.map((user, index) => (
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
            ))} */}
        </div>
    );
};

export default TopThree
