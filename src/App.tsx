import React, { useEffect } from 'react';
import './App.css';
import { Navigate, Route, RouteProps, Routes, useLocation } from 'react-router-dom';
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
import PostDetail from './pages/BoardPage/DetailPost/PostDetail';
import Header from './components/Header/Header';
import ChatIcon from './components/ChatIcon/ChatIcon';
import FindIdPage from './pages/FindIdPage/FindIdPage';
import FindPwPage from './pages/FindPwPage/FindPwPage';

function App() {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('accessToken');

  const hideHeaderRoutes = [/^\/ide$/, /^\/quest\/\d+$/, /^\/login$/, /^\/join$/];
  const shouldHideHeader = hideHeaderRoutes.some((routePattern) =>
    routePattern.test(location.pathname)
  );

  useEffect(() => {
    if (!isAuthenticated && location.pathname != '/login' && location.pathname != '/' && location.pathname != '/join') {
      window.location.replace('/login');
    }
  }, [location.pathname]);
  return (
    <div>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/ide" element={<IDEPage />} />
        <Route path="/quest" element={<QuestListPage />} />
        <Route path="/quest/:num" element={<IDEPage />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/changepw" element={<ChangePwPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/findId" element={<FindIdPage />} />
        <Route path="/findPw" element={<FindPwPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
      {!shouldHideHeader && <ChatIcon />}
    </div>
  );
}

export default App;
