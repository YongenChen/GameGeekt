// Import Swiper React components
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import {
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

SwiperCore.use([Autoplay, Pagination]);
const useStyles = makeStyles(() => createStyles({
  slideImage: {
    height: '300px',
    alignSelf: 'center',
  },

  slide: {
    display: 'flex',
    justifyContent: 'center',
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
];

export default () => {
  const classes = useStyles();
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true }}
      centeredSlides
      autoplay={{ delay: 2500, disableOnInteraction: false }}
    >
      {images.map((img) => (
        <SwiperSlide className={classes.slide}>
          <img src={img.src} alt={img.alt} className={classes.slideImage} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
