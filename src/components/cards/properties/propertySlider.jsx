import { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import PropertyMobile from "../PropertyMobile";

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
            className='transform translate-y-7 left-[10px] top-[160px] cursor-pointer z-10 siarrowright hover:scale-105 duration-200 ease-in-out hover:border-blue-500 hover:border-2' style={{ backgroundColor: 'white', borderRadius: '50%', height: '37px', width: '37px', display: 'inline-block', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
            <b><SlArrowLeft size={16} style={{ margin: '10px 10px 10px 10px', fontWeight: '500px' }}/></b>
        </div>
    );
};

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
            className='transform translate-y-7 right-[2px] cursor-pointer siarrowright hover:scale-105 duration-200 ease-in-out hover:border-blue-500 hover:border-2' style={{ backgroundColor: 'white', borderRadius: '50%', height: '37px', width: '37px', display: 'inline-block', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', position: 'absolute', bottom: '-55px' }}>
                <b><SlArrowRight size={16} style={{ margin: '10px -10px 10px 10px', fontWeight: '500px' }}/></b>
        </div>
    );
};

const PropertySlider = ({ properties, speed, delay, numberOfProperty, value }) => {
    const [oldSlide, setOldSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(value);
    const [activeSlide2, setActiveSlide2] = useState(0);
    let w = window.innerWidth;  let y = "";
    if(activeSlide == 0) {
        y = "";
    } else {
        y = <SamplePrevArrow to='prev' />;
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: speed,
        slidesToShow: 4,
        slidesToScroll: 1,
        className: 'slides',
        nextArrow: <SampleNextArrow to='next' />,
        prevArrow: "",
        pauseOnHover: true,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 820,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: speed,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    nextArrow: <SampleNextArrow to='next' />,
                    prevArrow: y,
                    centerMode: true,
                    autoplay: true,
                    pauseOnHover: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: speed,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow: <SampleNextArrow to='next' />,
                    prevArrow: y,
                    centerMode: true,
                    autoplay: true,
                    pauseOnHover: true
                },
            },
            {
                breakpoint: 640,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: speed,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow: <SampleNextArrow to='next' />,
                    prevArrow: y,
                    className: "slider variable-width",
                    centerMode: true,
                    centerPadding: "-35px",
                    pauseOnHover: true
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
        <div className='slider property-item'>
            <Slider {...settings}>
                {properties?.map((property, index) => (
                    <div key={index} className='p-2'>
                        <PropertyMobile key={property.id} property={property} numberOfProperty={numberOfProperty} width={w} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PropertySlider;