import { Quest } from "../../pages/QuestListPage/types";

// 임시 문제 리스트
export function findAllQuest(): Quest[] {
    return [
        { state: "T", title: '같은 숫자는 싫어', level: 'Lv. 1', correctPeople: 10, accuracy: '90%' },
        { state: "T", title: '기능개발', level: 'Lv. 2', correctPeople: 48, accuracy: '80%' },
        { state: "F", title: '올바른 괄호', level: 'Lv. 2', correctPeople: 35, accuracy: '50%' },
        { state: null, title: '프로세스', level: 'Lv. 2', correctPeople: 15, accuracy: '50%' },
        { state: "F", title: '다리를 지나는 트럭', level: 'Lv. 2', correctPeople: 77, accuracy: '80%' },
        { state: "F", title: '주식가격', level: 'Lv. 2', correctPeople: 5, accuracy: '80%' },
        { state: null, title: '체육복', level: 'Lv. 1', correctPeople: 50, accuracy: '60%' },
        { state: "T", title: '섬 연결하기', level: 'Lv. 3', correctPeople: 52, accuracy: '50%' },
        { state: "F", title: '단속카메라', level: 'Lv. 3', correctPeople: 95, accuracy: '90%' },
        { state: null, title: '큰 수 만들기', level: 'Lv. 2', correctPeople: 35, accuracy: '50%' },
    ];
}

// 임시 최근문제
export function getRecentSolveQuest(id: string): Quest[] {
    return [
        { state: "T", title: '같은 숫자는 싫어', level: 'Lv. 1', correctPeople: 10, accuracy: '90%' },
        { state: "T", title: '기능개발', level: 'Lv. 2', correctPeople: 48, accuracy: '80%' },
        { state: "F", title: '올바른 괄호', level: 'Lv. 2', correctPeople: 35, accuracy: '50%' },
        { state: "F", title: '다리를 지나는 트럭', level: 'Lv. 2', correctPeople: 77, accuracy: '80%' },
        { state: "F", title: '주식가격', level: 'Lv. 2', correctPeople: 5, accuracy: '80%' },
        { state: "T", title: '섬 연결하기', level: 'Lv. 3', correctPeople: 52, accuracy: '50%' },
        { state: "F", title: '단속카메라', level: 'Lv. 3', correctPeople: 95, accuracy: '90%' },
    ];
}

