import React, {
  useEffect,
  useState,
} from 'react';
import {
  InputAdornment,
  InputBase,
  Typography,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
  fade,
} from '@material-ui/core/styles';
import {
  Search as SearchIcon,
} from '@material-ui/icons';
import {
  Autocomplete,
} from '@material-ui/lab';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Genres } from '../utils/enums';

const useStyles = makeStyles((theme: Theme) => createStyles({
  searchIcon: {
    color: '#ffff',
  },
  inputBase: {
    color: '#ffff',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    transition: '.35s ease-in-out',
    width: '100%',
    paddingLeft: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

interface IGame {
  id: number;
  name: string;
  genre: Genres
}

interface IQuery {
  games: IGame[];
}

const SEARCH_GAMES = gql`
  query{
    games{
      id
      name
      genre
    }
  }
`;

const Genre = {
  [Genres.ADVENTURE]: 'ADVENTURE',
  [Genres.FPS]: 'FIRST PERSON SHOOTER',
  [Genres.MMO]: 'MASSIVELY MULTIPLAYER ONLINE',
  [Genres.MOBILE]: 'MOBILE GAMES',
  [Genres.PUZZLE]: 'PUZZLE',
  [Genres.MOBA]: 'MULTIPLAYER ONLINE BATTLE ARENA',
  [Genres.RP]: 'ROLE PLAYING',
  [Genres.RTS]: 'REAL TIME STRATEGY',
  [Genres.SIMULATION]: 'SIMULATION',
  [Genres.SPORTS]: 'SPORTS',

};

export default function SearchBar() {
  const classes = useStyles();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [value, setValue] = useState<IGame|null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const { data, refetch } = useQuery<IQuery>(SEARCH_GAMES);

  // if a value is selected, redirect them
  useEffect(() => {
    if (value) {
      history.push(`/games/${value.id}`);
      setValue(null);
      setSearchTerm('');
    }
  }, [value, setValue, history, setSearchTerm]);

  return (
    <Autocomplete
      fullWidth
      value={value}
      options={data?.games || []}
      groupBy={(option) => Genre[option.genre]}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      onOpen={() => {
        refetch();
      }}
      getOptionLabel={(option) => option.name}
      noOptionsText={searchTerm.length > 0 ? (
        <Typography>
          No games found
        </Typography>
      ) : (
        <Typography>
          Search game by title
        </Typography>
      )}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...inputParams } = params;
        return (
          <div ref={InputProps.ref}>
            <InputBase
              placeholder="Search for a game..."
              className={classes.inputBase}
              startAdornment={(
                <InputAdornment position="start">
                  <SearchIcon className={classes.searchIcon} />
                </InputAdornment>
            )}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...inputParams}
              onChange={handleChange}
              value={searchTerm}
            />
          </div>
        );
      }}
    />
  );
}
