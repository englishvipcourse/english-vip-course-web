'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import SlideUploadModal from './Components/SlideUploadModal'; // Import the modal component
import React from 'react';

// Pre-set colors with hover variants
type HighlightColor = 'blue' | 'yellow' | 'red' | 'black' | 'green';

const presetColors: Record<HighlightColor, { normal: string; hover: string }> = {
  blue: { normal: 'bg-blue-500', hover: 'hover:bg-blue-700' },
  yellow: { normal: 'bg-yellow-500', hover: 'hover:bg-yellow-700' },
  red: { normal: 'bg-red-500', hover: 'hover:bg-red-700' },
  black: { normal: 'bg-black', hover: 'hover:bg-gray-800' },
  green: { normal: 'bg-green-500', hover: 'hover:bg-green-700' }
};

export default function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index
  const [slides, setSlides] = useState<any[]>([]); // Store the fetched slides
  const [isLoggedIn, setIsLoggedIn] = useState(false); // User login state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for editing slides

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Fetch slides data from Firestore
    const fetchSlides = async () => {
      const slidesCollection = collection(db, "slides");
      const slidesSnapshot = await getDocs(slidesCollection);
      const slidesList = slidesSnapshot.docs.map((doc) => doc.data());
      setSlides(slidesList);
    };

    fetchSlides();

    return () => unsubscribe();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[86vh] bg-blue-500 flex items-center justify-center overflow-hidden">
      {/* Display welcome message if no slides */}
      {slides.length === 0 ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30">
          <h2 className="text-6xl font-bold">Bem-vindo à English Vip Course</h2>
        </div>
      ) : (
        <div className="absolute inset-0 flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                width={1000}
                height={1000}
                priority
              />
              {/* Text and Button Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30">
                <div className='flex flex-col items-start w-[50%] gap-4'>
                  <h2 className="sm:text-5xl text-3xl font-bold mb-4 leading-loose">
                    {slide.text.split(slide.highlightedText).map((part: any, i: any) => (
                      <React.Fragment key={i}>
                        {i > 0 && (
                          <span
                            className='leading-loose'
                            style={{
                              backgroundColor: slide.highlightColor,
                              fontWeight: 'bold',
                              padding: '0px 2px',
                              borderRadius: '3px',
                            }}
                          >
                            {slide.highlightedText}
                          </span>
                        )}
                        {part}
                      </React.Fragment>
                    ))}
                  </h2>
                  <a href={slide.buttonLink}>
                    <button
                      className={`px-6 py-2 text-base ${presetColors[slide.highlightColor as HighlightColor]?.normal} ${presetColors[slide.highlightColor as HighlightColor]?.hover} text-white rounded-3xl transition-all duration-300 ease-in-out`}
                    >
                      {slide.buttonLabel}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Previous Button */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2">
        <IoIosArrowBack className='w-8 h-8 text-white' />
      </button>

      {/* Next Button */}
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2">
        <IoIosArrowForward className='w-8 h-8 text-white' />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-3 rounded-lg ${index === currentSlide ? 'bg-sky-400' : 'bg-gray-200'} transition-all duration-300`}
          ></button>
        ))}
      </div>

      {/* Edit Slides Button (Visible if user is logged in) */}
      {isLoggedIn && (
        <div className="absolute top-5 right-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 text-white bg-green-500 hover:bg-green-700 rounded-lg transition-all duration-300 ease-in-out"
          >
            Edit Panel
          </button>
        </div>
      )}

      {/* Modal to upload a new slide */}
      <SlideUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
