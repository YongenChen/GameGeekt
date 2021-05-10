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
import Footer from './components/Footer';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import TheTeam from './pages/TheTeam';
import RequestGameForm from './pages/RequestGameForm';
import Game from './pages/dynamic/Game';
import Genres from './pages/dynamic/GenresPage';
import NotFound from './pages/Error404';
import AllGames from './pages/AllGames';

const link = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URL,
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

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
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
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
            <Route path="/games">
              <AllGames />
            </Route>
            <Route path="/games/:id">
              <Game />
            </Route>
            <Route path="/genre/:genre">
              <Genres />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
