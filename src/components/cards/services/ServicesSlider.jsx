import { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import ServiceCard from "../../pages/services/ServiceCard";

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
            className='xl:relative transform -translate-y-1/2  xl:top-[238px] cursor-pointer z-10 siarrowright ease-in-out hover:border-blue-500 hover:border-2' 
            style={{ backgroundColor: 'white', borderRadius: '50%', height: '37px', width: '37px', display: 'inline-block', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
            <b><SlArrowLeft size={16} style={{ margin: '10px 10pc 10px 10px', fontWeight: '500px' }}/></b>
        </div>
    );
};

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
            className='transform -translate-y-1/2 right-[2px] xl:top-[238px] cursor-pointer siarrowright hover:scale-105 duration-200 ease-in-out hover:border-blue-500 hover:border-2' 
            style={{ backgroundColor: 'white', borderRadius: '50%', height: '37px', width: '37px', display: 'inline-block', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', position: 'absolute', bottom: '-55px;' }}>
                <b><SlArrowRight size={16} style={{ margin: '10px -10px 10px 10px', fontWeight: '500px' }}/></b>
        </div>
    );
};

export const ServicesSlider = ({ services }) => {
    const [oldSlide, setOldSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeSlide2, setActiveSlide2] = useState(0);
    let y = "";
    if(activeSlide == 0) {
        y = "";
    } else {
        y = <SamplePrevArrow to='prev' />;
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        className: 'slides',
        nextArrow: <SampleNextArrow to='next' />,
        prevArrow: y,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: 2000,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    className: 'slides',
                    nextArrow: <SampleNextArrow to='next' />,
                    prevArrow: y,
                    cssEase: "linear",
                    pauseOnDotsHover: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: 2000,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    className: 'slides',
                    nextArrow: <SampleNextArrow to='next' />,
                    prevArrow: y,
                    cssEase: "linear",
                    pauseOnDotsHover: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    centerMode: true,
                    dots: false,
                    infinite: true,
                    speed: 2000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    className: 'slides',
                    nextArrow: <SampleNextArrow to='next' />,
                    prevArrow: y,
                    cssEase: "linear",
                    pauseOnDotsHover: true,
                },
            },
        ],
        beforeChange: (current, next) => {
            setOldSlide(current);
            setActiveSlide(next);
        },
        afterChange: current => setActiveSlide2(current)
    };

    return (
        <div className='slider'>
            <Slider {...settings}>
                {services?.map((service, index) => (
                    <div key={index} className='p-2'>
                        <ServiceCard service={service} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};