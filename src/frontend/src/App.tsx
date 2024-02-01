//Author: Nico Mangold
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {RouterRoutes} from './constants/routerRoutes';
import {AuthenticationLoginPage} from './pages/AuthenticationLoginPage';
import {RoomListPage} from './pages/RoomListPage';
import {RoomPage} from './pages/RoomPage';
import {Router} from './pages/Router';
import {AuthenticationRegisterPage} from './pages/AuthenticationRegisterPage';
import {AppContent} from './App.styles';

//Defines the content of the App with its routes
function App() {
  return (
    <AppContent>
      <Routes>
        <Route path={RouterRoutes.Login} element={<AuthenticationLoginPage />} />
        <Route path={RouterRoutes.Register} element={<AuthenticationRegisterPage />} />
        <Route path={RouterRoutes.RoomList} element={<RoomListPage />} />
        <Route path={RouterRoutes.Room} element={<RoomPage />} />
        <Route path='*' element={<Router />} />
      </Routes>
    </AppContent>
  );
}

export default App;
