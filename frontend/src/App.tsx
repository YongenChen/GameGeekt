/* eslint-disable no-debugger */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Home from './pages/Home';
import AppBar from './components/AppBar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FirstPersonShooter from './pages/FirstPersonShooter';
import MultiplayerOnlineBattleArena from './pages/MultiplayerOnlineBattleArena';
import MassivelyMultiplayerOnline from './pages/MassivelyMultiplayerOnline';
import Simulations from './pages/Simulation';
import StealthShooter from './pages/StealthShooter';
import Combat from './pages/Combat';
import Adventure from './pages/Adventure';
import RealTimeStrategy from './pages/RealTimeStrategy';
import Puzzle from './pages/Puzzle';
import Sports from './pages/Sports';
import RolePlaying from './pages/RolePlaying';
import Mobile from './pages/Mobile';

const createDarkTheme = () => createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#22223B',
    },
    secondary: {
      main: '#9A8C98',
    },
    tertiary: {
      light: '#fcdfd8',
      main: '#C9ADA7',
      dark: '#987e78',
      contrastText: '#000',
    },
  },
});

const createLightTheme = () => createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#22223B',
    },
    secondary: {
      main: '#9A8C98',
    },
    tertiary: {
      light: '#fcdfd8',
      main: '#C9ADA7',
      dark: '#987e78',
      contrastText: '#000',
    },
  },
});

function App() {
  const [globalTheme, setGlobalTheme] = useState(localStorage.getItem('darkThemeState') === 'dark' ? createDarkTheme() : createLightTheme());
  const getGlobalTheme = () => {
    setGlobalTheme(localStorage.getItem('darkThemeState') === 'dark' ? createDarkTheme() : createLightTheme());
  };

  return (
    <MuiThemeProvider theme={globalTheme}>
      <Router>
        <CssBaseline />
        <AppBar
          getGlobalTheme={getGlobalTheme}
        />
        <Switch>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/first-person-shooters">
            <FirstPersonShooter />
          </Route>
          <Route path="/multiplayer-online-battle-arenas">
            <MultiplayerOnlineBattleArena />
          </Route>
          <Route path="/massively-multiplayer-online">
            <MassivelyMultiplayerOnline />
          </Route>
          <Route path="/simulations">
            <Simulations />
          </Route>
          <Route path="/stealth-shooter">
            <StealthShooter />
          </Route>
          <Route path="/combat">
            <Combat />
          </Route>
          <Route path="/adventure">
            <Adventure />
          </Route>
          <Route path="/real-time-strategy">
            <RealTimeStrategy />
          </Route>
          <Route path="/puzzles">
            <Puzzle />
          </Route>
          <Route path="/sports">
            <Sports />
          </Route>
          <Route path="/role-playing">
            <RolePlaying />
          </Route>
          <Route path="/mobile-games">
            <Mobile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
