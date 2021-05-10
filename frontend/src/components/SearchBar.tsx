import { InputAdornment, InputBase } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  fade,
} from '@material-ui/core/styles';
import {
  Search as SearchIcon,
} from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => createStyles({
  searchIcon: {
    color: '#ffff',
  },
  inputInput: {
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

const games = [
  'Valorant',
  'CSGO',
  'Dota 2',
  'League of Legends',
  'Among Us',
  'It Takes Two',
  'Age of Empires III',
];

interface IGameOption {
    name: string;
  }

export default function SearchBar() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = games.filter((games) => games.toLowerCase().includes(searchTerm));
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div>
      <Autocomplete
        id="auto-complete"
        autoComplete
        includeInputInList
        renderInput={(params) => (
          <InputBase
            {...params}
            startAdornment={(
              <InputAdornment position="start">
                <SearchIcon className={classes.searchIcon} />
              </InputAdornment>
        )}
            className={classes.inputInput}
            placeholder="Search for a game..."
            value={searchTerm}
            onChange={handleChange}
          />
        )}
      />
    </div>
  );
}

// const top100Films = [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },
//   { title: 'The Godfather: Part II', year: 1974 },
//   { title: 'The Dark Knight', year: 2008 },
//   { title: '12 Angry Men', year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: 'Pulp Fiction', year: 1994 },
//   { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
//   { title: 'The Good, the Bad and the Ugly', year: 1966 },
//   { title: 'Fight Club', year: 1999 },
//   { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
//   { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
//   { title: 'Forrest Gump', year: 1994 },
//   { title: 'Inception', year: 2010 },
// ];
