import React, { ReactElement } from 'react';
import { gql, useQuery } from '@apollo/client';

interface games {
  gameid: number;
  name: string;
  genre: string;
  description: string;
  imglink: string;
}

interface gamesData {
  games: games[];
}

const GET_GAMES = gql`
  query {
    games {
        name,
        genre,
        description
    }
  }
  `;

// const useStyles = makeStyles({
//   gridContainer: {
//     paddingTop: '10px',
//     paddingLeft: '50px',
//     paddingRight: '50px',
//     justifyContent: 'center',

//   },
//   root: {
//     background: ' rgba( 172, 166, 215, 0.25 )',
//     boxShadow: '0 8px 32px 0 rgba( 0, 0, 0, 0.37 )',
//     minWidth: 300,
//     minHeight: 400,
//     backdropFilter: 'blur(7 px)',
//     borderRadius: '10px',
//     border: '1px solid rgba( 255, 255, 255, 0.18 )',
//     WebkitBackdropFilter: 'blur(7.0px)',
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
//   genreTitle: {
//     display: 'flex',
//     justifyContent: 'center',
//     paddingTop: '20px',
//     textShadow: '5px 4px 4px black',
//   },
// });

export default function Adventure(): ReactElement {
  const { loading, data } = useQuery<gamesData>(
    GET_GAMES,
  );
  return (
    <div>
      <h3>Available Inventory</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {data && data.games.map((game) => (
              <tr>
                <td>{game.name}</td>
                <td>{game.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
