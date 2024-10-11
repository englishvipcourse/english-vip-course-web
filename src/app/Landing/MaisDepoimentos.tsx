'use client';

import { useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const MaisDepoimentos: React.FC = () => {
    const slides = [
        (<iframe key="slide1" width="100%" height="100%" src="https://www.youtube.com/embed/-hZCt_EHdfI" title="🗣️ Depoimento Inspirador" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>),
        (<iframe key="slide2" width="100%" height="100%" src="https://www.youtube.com/embed/XDZB4SJQxhc" title="🌟 Depoimento Inspirador" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>),
        (<iframe key="slide3" width="100%" height="100%" src="https://www.youtube.com/embed/k0qA0oiedK0" title="🎬 Depoimento Inspirador" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>),
        (<iframe key="slide4" width="100%" height="100%" src="https://www.youtube.com/embed/iBqdjNhCbsc" title="🎓 Depoimento Inspirador" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>)
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3); // Default to show 3 videos

    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(window.innerWidth < 768 ? 1 : 3); // Update visible count based on window size
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize); // Update on resize

        return () => window.removeEventListener('resize', handleResize); // Cleanup
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + visibleCount) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - visibleCount : prevSlide - visibleCount));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index * visibleCount);
    };

    return (
        <div className="text-[#505050] flex flex-col items-center">
            <div className="flex flex-col items-center font-bold sm:text-6xl text-4xl w-full p-8">
                <span>Veja o que mais</span>
                <span className="text-gradient">Alunos dizem</span>
            </div>

            <div className="relative w-[85vw] h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="flex transition-transform duration-500 gap-4" style={{ transform: `translateX(-${currentSlide * (100 / visibleCount)}%)` }}>
                    {slides.map((slide, index) => (
                        <div key={index} className={`flex-shrink-0 aspect-video ${visibleCount === 1 ? 'w-full' : 'w-1/3'} h-auto`}> {/* Responsive width */}
                            {slide}
                        </div>
                    ))}
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 z-10">
                    <IoIosArrowBack className='w-8 h-8 text-white' />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 z-10">
                    <IoIosArrowForward className='w-8 h-8 text-white' />
                </button>

                <div className="absolute bottom-5 flex space-x-2">
                    {Array.from({ length: Math.ceil(slides.length / visibleCount) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-12 h-3 rounded-lg ${index * visibleCount === currentSlide ? 'bg-sky-400' : 'bg-gray-200'} transition-all duration-300`}>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MaisDepoimentos;
