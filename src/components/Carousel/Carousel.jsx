import './Carousel.scss'
import React, { useRef } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import useViewport from '../../hooks/useViewport'
import Poster from '../Poster/Poster'
import { FiChevronRight } from 'react-icons/fi'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
SwiperCore.use([Navigation, Pagination]);

export default function Carousel(props) {
    const { title, movies } = props ? props : {}
    const { width } = useViewport()
    const isNetflixOriginal = (title === "Cornflix Originals") ? true : false

    const navigationPrevRef = useRef(null);
	const navigationNextRef = useRef(null);
    const customSwiperParams = {
        observer: true,
        observeParents: true,
		navigation: {
			prevEl: navigationPrevRef.current,
			nextEl: navigationNextRef.current,
		},
		breakpoints:{
			1378: { slidesPerView: 6, slidesPerGroup: 6 },
			998: { slidesPerView: 4, slidesPerGroup: 4 },
			625: { slidesPerView: 3, slidesPerGroup: 3 },
			330: { slidesPerView: 2, slidesPerGroup: 2 },
			0: { slidesPerView: 1.5, slidesPerGroup: 1.5 }
		},
		loopAdditionalSlides: width >= 1378 ? 5 : width >= 998 ? 3 : width >= 625 ? 2 : 2,
		pagination: true,
		loop: true,
		grabCursor: false,
		draggable: false,
		preventClicksPropagation: true,
		preventClicks: true,
		slideToClickedSlide: false,
		allowTouchMove: true,
        loopedSlides: 19,
    };

	function rightMouseOver(e) {
        if (e.currentTarget.classList.contains('right')) { 
            e.currentTarget.parentElement.classList.add('is-right')
        } 
        else if (e.currentTarget.classList.contains('left')) { 
            e.currentTarget.parentElement.classList.add('is-left')
        } 
    }

	function rightMouseOut(e) {
        e.currentTarget.parentElement.classList.remove('is-right', 'is-left')
    }

	function insertPositionClassName(index) {
        const i = index + 1
        if (i === 1){
            return 'left'
        }
        else if (i === 20){
            return 'right'
        }

        if (width >= 1378) {
            if ([7, 13, 19].includes(i)){
                return 'left'
            }
            else if ([6, 12, 18].includes(i)){
                return 'right'
            }
        }
        else if (width >= 998) {
            if ([5, 9, 13, 17].includes(i)){
                return 'left'
            }   
            else if ([4, 8, 12, 16].includes(i)){
                return 'right'
            }
        }
        else if (width >= 768) {
            if ([4, 7, 10, 13, 16].includes(i)){
                return 'left'
            }
            else if ([3, 6, 9, 12, 15, 18].includes(i)){
                return 'right'
            }
        }
    }

  return (
    <div className='Carousel'>
        <h3 className='Carousel__title'>
            <span>{title}</span>
            <span className="Carousel__showmore">Explore All <FiChevronRight /></span>
        </h3>
        <div className='Carousel__slider'>
            <div className='Carousel__slider--mask left' ref={navigationPrevRef}>
                <MdChevronLeft className='Carousel__slider--mask-icon left' size='3em' style={{ color: 'white' }} />
            </div>
            <div className='Carousel__slider--mask right' ref={navigationNextRef}>
                <MdChevronRight className='Carousel__slider--mask-icon right' size='3em' style={{ color: 'white' }} />
            </div>
            <Swiper
                {...customSwiperParams}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
            >
                {movies && movies.map((movie, i) => (
                    <SwiperSlide
                        key={movie.id}
                        className={insertPositionClassName(i)}
                        onMouseOver={rightMouseOver}
                        onMouseOut={rightMouseOut}
                    >
                        <Poster movie={movie} isLarge={isNetflixOriginal} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
  )
}
