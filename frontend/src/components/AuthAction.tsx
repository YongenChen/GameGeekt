import {
  Avatar,
  Button,
} from '@material-ui/core';
import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  gql, useMutation, useQuery, useApolloClient,
} from '@apollo/client';

const useStyles = makeStyles((theme: Theme) => createStyles({
  // appBar: {
  // backgroundColor: theme.palette.type === 'light' ?
  // 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
  // backdropFilter: 'blur(3px)',
  // boxShadow: `1px 1px 1px 0 ${theme.palette.type === 'light' ?
  // 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'}`,
  // },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    background: 'linear-gradient(#e01e37, #b7094c, #3bc2db, #ffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitTextStrokeWidth: '0.8px',
    WebkitTextStrokeColor: 'white',
    //  color: theme.palette.type === 'light' ?
    //  theme.palette.secondary.main : theme.palette.secondary.light,
    textDecoration: 'none',
    fontFamily: "'Press Start 2P', Roboto",
    fontSize: '35px',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginButton: {
    borderColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.main,
    fontWeight: theme.typography.fontWeightBold,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.tertiary.light,
    },
    marginRight: theme.spacing(2),
  },
  signUpButton: {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
    fontWeight: theme.typography.fontWeightBold,
    '&:hover': {
      backgroundColor: theme.palette.tertiary.light,
    },
  },
  avatar: {
    height: '35px',
    width: '35px',
    backgroundColor: theme.palette.tertiary.main,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  loginContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
  },
}));

const CURRENT_USER = gql`
query returnCurrentUser {
  currentUser {
    username,
    userid
  }
}
`;

const LOGOUT_USER = gql`
mutation logout {
    logout
}
`;

interface ICurrentUser {
    username: string;
    userid: string;
}

interface IResult {
    currentUser: ICurrentUser;
}

export default function AuthAction() {
  const classes = useStyles();
  const { data } = useQuery<IResult>(CURRENT_USER);
  const [logout] = useMutation(LOGOUT_USER, {
    update: (cache) => {
      cache.writeQuery({
        query: gql`
          query returnCurrentUser {
            currentUser {
              username,
              userid
            }
          }
          `,
        data: null,
      });
    },
  });
  const apolloClient = useApolloClient();
  if (data?.currentUser) {
    return (
      <div className={classes.avatarContainer}>
        <Avatar className={classes.avatar}>
          {data.currentUser.username.substring(0, 1).toUpperCase()}
        </Avatar>
        <div className={classes.loginContainer}>
          <Button
            variant="outlined"
            className={classes.loginButton}
            component={Link}
            to="/"
            onClick={async () => {
              await logout();
              await apolloClient.resetStore();
              window.location.reload();
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Button
        variant="outlined"
        className={classes.loginButton}
        component={Link}
        to="/login"
      >
        Log In
      </Button>
      <Button
        variant="contained"
        className={classes.signUpButton}
        component={Link}
        to="/sign-up"
      >
        Sign Up
      </Button>
    </div>
  );
}
