import { useState, useEffect, useRef } from 'react';
import { FaArrowRight } from "react-icons/fa";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true); // Control autoplay
    const timerRef = useRef(null); // Ref for the timer

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        // Autoplay logic
        if (isAutoPlaying) {
        timerRef.current = setInterval(nextSlide, 4000); // Change slide every 3 seconds
        } else {
        clearInterval(timerRef.current); // Clear timer if autoplay is off
        }

        // Clean up timer on component unmount to prevent memory leaks
        return () => clearInterval(timerRef.current);

    }, [isAutoPlaying, images.length]); // Re-run effect when autoplay or images change

    // Optional: Pause on hover
    const handleMouseEnter = () => {
        clearInterval(timerRef.current);
        setIsAutoPlaying(false);
    };

    const handleMouseLeave = () => {
        setIsAutoPlaying(true); // Resume autoplay
    };
    return (
        <div className="relative w-full xl:h-[480px] h-[200px] rounded-lg overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> {/* Adjust height as needed */}
        {images.map((image, index) => (
            <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-500 ${
                index === currentIndex ? 'translate-x-0' : index > currentIndex ? 'translate-x-full' : '-translate-x-full'
            }`}
            >
                <img src={image} alt={`Slide ${index + 1}`} className="object-cover w-full h-full" />
                <div className="absolute flex xl:top-[430px] top-[150px] h-14 rounded-md inset-0 bg-opacity-40 bg-black space-y-2">
                    <div className="text-white xl:flex hidden text-sm font-semibold mt-3 ml-2">
                        Agency: Galen Heights
                    </div>

                    <div className="text-white text-sm font-semibold relative top-1 xl:ml-10 ml-2">
                        Project: Galen Heights
                    </div>
                </div>
            </div>
        ))}

        {/* Optional: Indicators */}
            <div className="absolute top-2 left-4 flex space-x-2">
                {images.map((_, index) => (
                    <>
                        <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`xl:w-[50px] w-[10px] h-1 rounded-full ${
                            index === currentIndex ? 'bg-white' : 'bg-gray-400'
                        }`}
                        ></button>
                    </>
                ))}
            </div>

            <div className="absolute xl:bottom-2 bottom-3 right-4 flex space-x-2">
                <button className="bg-bg-color hover:border-gray-700 text-white font-medium xl:py-1.5 py-1 px-4 rounded-lg flex">
                    <span className="mr-2 text-sm">Visit Site</span> <FaArrowRight className="mt-1 text-sm"/>
                </button>
            </div>
        </div>
    );
};

export default Carousel;