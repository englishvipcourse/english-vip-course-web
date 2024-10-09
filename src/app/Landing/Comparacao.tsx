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

import React from "react";

const ComparisonTable: React.FC = () => {
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
            image: Slide1
        },
        { 
            image: Slide2
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index

    // Function to go to the next slide
    const nextSlide = () => {
        setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 300); // Transition duration in ms
    };

    // Function to go to the previous slide
    const prevSlide = () => {
        setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
        }, 300);
    };

    // Function to directly jump to a slide when a dot is clicked
    const goToSlide = (index: number) => {
        setTimeout(() => {
            setCurrentSlide(index);
        }, 300);
    };

    return (
    <div className="text-[#505050] flex flex-col items-center my-10">
      {/* Title */}
        <div className="flex flex-col items-center font-bold sm:text-6xl text-4xl w-full p-20">
            <span>Veja como</span>
            <span className="text-blue-600">Nossa Escola Se Destaca</span>
        </div>
      {/* Table */}
      <div className="overflow-x-auto mx-40 text-black">
        <table className="w-full border-collapse text-center">
          {/* Table Header */}
          <thead>
            <tr>
            <th className=""></th>
              <th className="bg-blue-600 text-white px-6 py-4 rounded-t-2xl">Nossa Escola Online</th>
              <th className="bg-gray-200 text-gray-800 px-6 py-4 rounded-t-3xl">Cursos Presenciais</th>
              <th className="bg-gray-200 text-gray-800 px-6 py-4 rounded-t-3xl">Professores Particulares</th>
              <th className="bg-gray-200 text-gray-800 px-6 py-4 rounded-t-3xl">Cursos Gravados</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <td className="border px-4 py-3 text-left">Aulas personalizadas aos interesses e objetivos dos alunos</td>
              <td className="border px-4 py-3">
                <span className="inline-block bg-blue-600 w-4 h-4 rounded-full"></span>
              </td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
            </tr>
            {/* Row 2 */}
            <tr>
              <td className="border px-4 py-3 text-left">Material editado a cada aula com foco nos interesses do aluno</td>
              <td className="border px-4 py-3">
                <span className="inline-block bg-blue-600 w-4 h-4 rounded-full"></span>
              </td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
            </tr>
            {/* Row 3 */}
            <tr>
              <td className="border px-4 py-3 text-left">Método exclusivo que agiliza o aprendizado</td>
              <td className="border px-4 py-3">
                <span className="inline-block bg-blue-600 w-4 h-4 rounded-full"></span>
              </td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
            </tr>
            {/* Row 4 */}
            <tr>
              <td className="border px-4 py-3 text-left">Conversação desde a primeira aula</td>
              <td className="border px-4 py-3">
                <span className="inline-block bg-blue-600 w-4 h-4 rounded-full"></span>
              </td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-blue-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
            </tr>
            {/* Row 5 */}
            <tr>
              <td className="border px-4 py-3 text-left">Aulas online e ao vivo no melhor horário pro aluno</td>
              <td className="border px-4 py-3">
                <span className="inline-block bg-blue-600 w-4 h-4 rounded-full"></span>
              </td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3">
                <span className="inline-block bg-blue-600 w-4 h-4 rounded-full"></span>
              </td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
            </tr>
            {/* Row 6 */}
            <tr>
              <td className="border px-4 py-3 text-left">Aulas interativas, engajamento constante</td>
              <td className="border px-4 py-3">
                <span className="inline-block bg-blue-600 w-4 h-4 rounded-full"></span>
              </td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
            </tr>

            {/* Row 7 */}
            <tr>
              <td className="border px-4 py-3 text-left">Feedback em tempo real e acompanhamento individualizado	</td>
              <td className="border px-4 py-3">
                <span className="inline-block bg-blue-600 w-4 h-4 rounded-full"></span>
              </td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
            </tr>

            {/* Row 8 */}
            <tr>
              <td className="border px-4 py-3 text-left">Garantia e Estrutura escolar</td>
              <td className="border px-4 py-3">
                <span className="inline-block bg-blue-600 w-4 h-4 rounded-full"></span>
              </td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
              <td className="border px-4 py-3"><span className="inline-block bg-gray-600 w-4 h-4 rounded-full"></span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full gap-36 flex flex-row items-center justify-between p-12 py-20 px-20 mt-20 bg-blue-900 text-white">
        <p className="text-4xl font-semibold leading-[45px]">
        A nossa escola online se destaca por oferecer um ensino de <span className="bg-red-600">inglês altamente personalizado</span> e adaptado às necessidades e interesses específicos de cada aluno.
        </p>
        <p className="leading-7">
        Nossa escola de inglês online é estruturada para atender às necessidades específicas de cada aluno, oferecendo um método personalizado, flexível e eficaz que transforma o aprendizado do inglês em uma experiência agradável e recompensadora. Estamos comprometidos em ajudar nossos alunos a alcançar seus objetivos com confiança e segurança.
        </p>
      </div>

      <div>
        <div className="flex flex-col items-center font-bold sm:text-6xl text-4xl w-full p-20">
            <span>Veja o que mais</span>
            <span className="text-blue-600">Alunos dizem</span>
        </div>

        <div className="relative w-[70vw] h-[40vh] bg-blue-500 flex items-center justify-center overflow-hidden">
            {/* Slides Container */}
            <div className="absolute inset-0 flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0">
                        <Image
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
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

      </div>
    </div>
  );
};

export default ComparisonTable;
