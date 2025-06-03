// App.js
import React, { useMemo, useState } from 'react';
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';

import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import HomePage from './Components/Home/HomePage';

function App() {
  const orbMemo = useMemo(() => <Orb />, []);
  const [active, setActive] = useState(1); // <-- track active menu item

  return (
    <AppStyled bg={bg}>
      {orbMemo}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>
                  <Dashboard />
                </main>
              </MainLayout>
            }
          />
          <Route
            path="/income"
            element={
              <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>
                  <Income />
                </main>
              </MainLayout>
            }
          />
          <Route
            path="/expenses"
            element={
              <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>
                  <Expenses />
                </main>
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
