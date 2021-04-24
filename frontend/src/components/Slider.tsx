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
import { Button } from '@material-ui/core';

SwiperCore.use([Pagination, Navigation]);
const useStyles = makeStyles(() => createStyles({
  buttonImage: {
    height: '300px',
    alignSelf: 'center',
  },

  slide: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'pink',
    },
    width: '250px',
    height: '250px',
  },
}));

interface Image {
    src: string;
    alt: string;
}

const images: Image[] = [
  {
    src: 'https://image-cdn.essentiallysports.com/wp-content/uploads/20210121211727/valorant-personajes-2.jpg',
    alt: 'Valorant',
  },
  {
    src: 'https://www.pcinvasion.com/wp-content/uploads/2019/11/Age-of-Empires-II-Definitive-Edition-review.jpg',
    alt: 'Age of Empires II: Definitive Edition',
  },
  {
    src: 'https://media.contentapi.ea.com/content/dam/walrus/en-us/migrated-images/2017/04/reveal-swbf2-fb-meta-image-alt.png.adapt.crop191x100.1200w.png',
    alt: 'Battlefront II',
  },
  {
    src: 'https://media.altchar.com/prod/images/940_530/gm-3ca57bb6-cab6-4224-98cd-4cdf8f5d38ea-cyberpunk2077.jpeg',
    alt: 'Cyberpunk 2077',
  },
  {
    src: 'https://image-cdn.essentiallysports.com/wp-content/uploads/20210121211727/valorant-personajes-2.jpg',
    alt: 'Slide 5',
  },
  {
    src: 'https://image-cdn.essentiallysports.com/wp-content/uploads/20210121211727/valorant-personajes-2.jpg',
    alt: 'Slide 6',
  },
  {
    src: 'https://image-cdn.essentiallysports.com/wp-content/uploads/20210121211727/valorant-personajes-2.jpg',
    alt: 'Slide 7',
  },
  {
    src: 'https://image-cdn.essentiallysports.com/wp-content/uploads/20210121211727/valorant-personajes-2.jpg',
    alt: 'Slide 8',
  },
  {
    src: 'https://image-cdn.essentiallysports.com/wp-content/uploads/20210121211727/valorant-personajes-2.jpg',
    alt: 'Slide 9',
  },
  {
    src: 'https://image-cdn.essentiallysports.com/wp-content/uploads/20210121211727/valorant-personajes-2.jpg',
    alt: 'Slide 10',
  },
];

export default () => {
  const classes = useStyles();
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      loop
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true }}
      navigation
    >
      {images.map(() => (
        <SwiperSlide className={classes.slide}>
          <Button variant="contained" className={classes.button}>
            {/* <img src={img.src} alt={img.alt} className={classes.buttonImage} /> */}
            Button
          </Button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
