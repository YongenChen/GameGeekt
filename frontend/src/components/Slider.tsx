// Import Swiper React components
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import {
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
// Import Swiper styles
import 'swiper/swiper-bundle.css';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
// import images
import FPSImage from '../images/Valorant.jpg';
import MOBAImage from '../images/LoL.jpg';
import MMOImage from '../images/FFXIV.jpeg';
import SIMImage from '../images/ACNH.jpg';
import ADVImage from '../images/BOTW.jpg';
import RTSImage from '../images/AoE.jpg';
import PuzzleImage from '../images/ItTakesTwo.jpg';
import SportsImage from '../images/RocketLeague.jpg';
import RPGImage from '../images/Octo.jpg';
import MobileImage from '../images/pokemonGO.png';

SwiperCore.use([Pagination, Navigation]);
const useStyles = makeStyles(() => createStyles({
  root: {
    background: ' rgba( 172, 166, 215, 0.25 )',
    boxShadow: '0 8px 32px 0 rgba( 0, 0, 0, 0.37 )',
    width: 250,
    height: 250,
    backdropFilter: 'blur(7 px)',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    WebkitBackdropFilter: 'blur(7.0px)',
  },
  buttonImage: {
    height: '250px',
    alignSelf: 'center',
  },

  slide: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba( 255, 255, 255, 0.25 )',
    '&:hover': {
      backgroundColor: 'rgba( 245, 166, 244, 0.25 )',
    },
    boxShadow: 'box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur(70px)',
    WebkitBackdropFilter: ' blur( 4px )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    width: '250px',
    height: '250px',
  },
}));

interface Image {
    src: string;
    alt: string;
    path: string;
    genre: string
}

const images: Image[] = [
  {
    src: FPSImage,
    alt: 'Valorant',
    path: './first-person-shooter',
    genre: 'First Person Shooter',
  },
  {
    src: MOBAImage,
    alt: 'League of Legends',
    path: './multiplayer-online-battle-arena',
    genre: 'Multiplayer Online Battle Arena',
  },
  {
    src: MMOImage,
    alt: 'FFXIV',
    path: './massively-multiplayer-online',
    genre: 'Massively Multiplayer Online',
  },
  {
    src: SIMImage,
    alt: 'Animal Crossing New Horizons',
    path: './simulation',
    genre: 'Simulation',
  },
  {
    src: ADVImage,
    alt: 'Legend of Zelda: Breath of the Wild',
    path: './adventure',
    genre: 'Adventure',
  },
  {
    src: RTSImage,
    alt: 'Age of Empires',
    path: './real-time-strategy',
    genre: 'Real-Time Strategy',
  },
  {
    src: PuzzleImage,
    alt: 'It Takes Two',
    path: './puzzle',
    genre: 'Puzzle',
  },
  {
    src: SportsImage,
    alt: 'Rocket League',
    path: './sports',
    genre: 'Sports',
  },
  {
    src: RPGImage,
    alt: 'Octopath Traveler',
    path: './role-playing',
    genre: 'Role-Playing',
  },
  {
    src: MobileImage,
    alt: 'Pokemon GO',
    path: '/mobile-games',
    genre: 'Mobile',
  },
];

export default () => {
  const classes = useStyles();
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      loop
      pagination={{ clickable: true }}
      navigation
    >
      {images.map((img) => (
        <SwiperSlide className={classes.slide} key={img.alt}>
          <Link underline="none" component={RouterLink} to={img.path}>
            <Card className={classes.root} variant="outlined">
              <CardActionArea>
                <CardMedia
                  className={classes.buttonImage}
                  component="img"
                  height="190"
                  src={img.src}
                  alt={img.alt}
                  title={img.genre}
                />
              </CardActionArea>
            </Card>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
