/* eslint-disable no-debugger */

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
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
import Footer from './components/Footer';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import TheTeam from './pages/TheTeam';
import RequestGameForm from './pages/RequestGameForm';
import TestPage from './pages/testPage';
import Game from './pages/dynamic/Game';

const link = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URL,
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

console.log(process.env.REACT_APP_GRAPHQL_SERVER_URL);

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
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={globalTheme}>
        <Router>
          <CssBaseline />
          <AppBar
            getGlobalTheme={getGlobalTheme}
          />
          <Switch>
            <Route path="/testPage">
              <TestPage />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/first-person-shooter">
              <FirstPersonShooter />
            </Route>
            <Route path="/multiplayer-online-battle-arena">
              <MultiplayerOnlineBattleArena />
            </Route>
            <Route path="/massively-multiplayer-online">
              <MassivelyMultiplayerOnline />
            </Route>
            <Route path="/simulation">
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
            <Route path="/puzzle">
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
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact-us">
              <ContactUs />
            </Route>
            <Route path="/the-team">
              <TheTeam />
            </Route>
            <Route path="/Request-Game-Form">
              <RequestGameForm />
            </Route>
            <Route path="/games/:id">
              <Game />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
