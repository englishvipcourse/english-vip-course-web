'use client';

// Next Imports
import { useState } from 'react';
import Image from 'next/image';

// Images
import Slide1 from '../../../images/slide/Slide-1.png';
import Slide2 from '../../../images/slide/Slide-2.png';

// Icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Slides() {
    const highlightStyle = {
        backgroundColor: 'rgba(214, 18, 45)', // Light red background
        fontWeight: 'bold', // Make it bold
        padding: '0px 8px', // Add some padding for better visibility
        borderRadius: '3px', // Optional: rounded corners
        lineHeight: 1.5,
    };
    
    // Use in your slides array
    const slides = [
        { 
            image: Slide1, 
            text: (
                <div>
                    Fale <span style={highlightStyle}>inglês fluentemente</span> e alcance seus objetivos
                </div>
            ), 
            buttonLabel: "SAIBA MAIS" 
        },
        { 
            image: Slide2, 
            text: (
                <div>
                    Aprenda inglês de verdade <span style={highlightStyle}>com aulas personalizadas</span> ao vivo
                </div>
            ), 
            buttonLabel: "EU QUERO AGORA" 
        }
    ];
    

    const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index
    const [isTransitioning, setIsTransitioning] = useState(false); // For transition effect

    // Function to go to the next slide
    const nextSlide = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
            setIsTransitioning(false);
        }, 300); // Transition duration in ms
    };

    // Function to go to the previous slide
    const prevSlide = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
            setIsTransitioning(false);
        }, 300);
    };

    // Function to directly jump to a slide when a dot is clicked
    const goToSlide = (index: number) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide(index);
            setIsTransitioning(false);
        }, 300);
    };

    return (
        <div className="relative w-full h-[86vh] bg-blue-500 flex items-center justify-center overflow-hidden">
            {/* Slides Container */}
            <div className="absolute inset-0 flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0">
                        <Image
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        {/* Text and Button Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30">
                            <div className='flex flex-col items-start w-[50%] gap-4'>
                                <h2 className="sm:text-5xl text-3xl font-bold mb-4">{slide.text}</h2>
                                <button className="px-6 py-2 text-base text-blue-950 bg-blue-300 hover:bg-blue-700 hover:text-white rounded-3xl transition-all duration-300 ease-in-out">
                                    {slide.buttonLabel}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Previous Button */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2">
                <IoIosArrowBack className='w-8 h-8 text-white' />
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2">
                <IoIosArrowForward className='w-8 h-8 text-white' />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-5 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-12 h-3 rounded-lg ${index === currentSlide ? 'bg-sky-400' : 'bg-gray-200'} transition-all duration-300`}>
                    </button>
                ))}
            </div>
        </div>
    );
}
