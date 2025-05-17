import { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Slider from "react-slick";

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
            className='transform -translate-y-1/2 left-[3px] cursor-pointer z-10 siarrowright' style={{ backgroundColor: 'white', borderRadius: '50%', height: '37px', width: '37px', display: 'inline-block', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
            <b><SlArrowLeft size={16} style={{ margin: '10px 10pc 10px 10px', fontWeight: '500px' }}/></b>
        </div>
    );
};

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
            className='transform -translate-y-1/2 right-[2px] cursor-pointer siarrowright' style={{ backgroundColor: 'white', borderRadius: '50%', height: '37px', width: '37px', display: 'inline-block', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', position: 'absolute', bottom: '-55px;' }}>
                <b><SlArrowRight size={16} style={{ margin: '10px -10px 10px 10px', fontWeight: '500px' }}/></b>
        </div>
    );
};

const ImageSlider = ({ images }) => {

    const [oldSlide, setOldSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeSlide2, setActiveSlide2] = useState(0);
    const [count, setCount] = useState(0)
    let y = "";
    if(activeSlide == 0) {
        y = "";
    } else {
        y = <SamplePrevArrow to='prev' />;
    }

    const settings = {
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow: <SampleNextArrow to='next' />,
                    prevArrow: y,
                    className: "slider variable-width",
                    centerMode: true,
                    centerPadding: "-10px",
                },
            },
            {
                breakpoint: 640,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: <SampleNextArrow to='next' />,
                    prevArrow: y,
                },
            },
        ],
        beforeChange: (current, next) => {
            setOldSlide(current);
            setActiveSlide(next);
        },
        afterChange: (current) => {
            setActiveSlide2(current)
        }
    };



    return (
        <div className='slider' style={{ marginTop: '-30px' }}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className='p-2 mt-4'>
                        <img key={index} src={image} alt={`Images ${index + 1}`} className='rounded-lg m w-full object-cover cursor-pointer' style={{ height: '265px' }} onClick={() => setMainImage(image)} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;