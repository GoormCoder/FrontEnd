import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import JoinPage from './pages/JoinPage/JoinPage';
import IDEPage from './pages/IDEPage/IDEPage';
import MyPage from './pages/MyPage/MyPage';
import QuestListPage from './pages/QuestListPage/QuestListPage';
import RankPage from './pages/RankPage/RankPage';
import BattlePage from './pages/BattlePage/BattlePage';
import ChangePwPage from './pages/ChangePwPage/ChangePwPage';
import BoardPage from './pages/BoardPage/BoardPage';
import Header from './components/Header/Header';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/ide" element={<IDEPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/quest" element={<QuestListPage />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/changepw" element={<ChangePwPage />} />
        <Route path="/board" element={<BoardPage />} />
      </Routes>
    </div>
  );
}

export default App;
