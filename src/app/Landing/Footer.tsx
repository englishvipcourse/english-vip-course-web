import Image from 'next/image';
import Logo from '../../../images/logo-branca-rodape.png';

import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { TbMailFilled } from "react-icons/tb";

export default function Footer() {
    return (
      <footer className="bg-blue-900 text-white py-20 w-screen">
        <div className="container mx-auto flex sm:flex-row flex-col justify-between sm:items-start items-center">
          {/* Left section */}
          <div className="flex flex-col sm:w-[35%] w-[50%]">
            <Image src={Logo} alt="English VIP Logo" />
          </div>
  
          {/* Middle Links */}
          <div className="flex sm:flex-row flex-col justify-around w-full sm:items-start items-center sm:py-0 py-4">
            <div className='flex flex-col items-start'>
                <a href="#quem-somos" className="hover:text-blue-300 hover:font-semibold duration-200 ease-in-out transition-all">
                Quem somos
                </a>
                <a href="#nosso-metodo" className="hover:text-blue-300 hover:font-semibold duration-200 ease-in-out transition-all">
                Nosso método
                </a>
            </div>
            <div className='flex flex-col items-start'>
                <a href="#nosso-time" className="hover:text-blue-300 hover:font-semibold duration-200 ease-in-out transition-all">
                Nosso Time
                </a>
                <a href="#depoimentos" className="hover:text-blue-300 hover:font-semibold duration-200 ease-in-out transition-all">
                Depoimentos
                </a>
            </div>
            <a href="#perguntas" className="hover:text-blue-300 hover:font-semibold duration-200 ease-in-out transition-all">
              Perguntas Frequentes
            </a>
          </div>
  
          {/* Right section - Contact and Social Media */}
          <div className="flex flex-col space-y-4">
            <div className='flex flex-col sm:items-start items-center gap-1'>
                <div className='flex flex-row gap-1 items-center'><BsTelephoneFill /><p>82 99324 - 6655</p></div>
                <div className='flex flex-row gap-1 items-center'>
                    <TbMailFilled />
                    <p>contato@englishvipcourse.com</p>
                </div>
            </div>
            {/* Social Media Icons */}
            <div className="flex sm:justify-start justify-center space-x-4 mt-4">
              <a href="https://www.instagram.com/englishvipcourse/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="h-6 w-6 hover:text-blue-300 duration-200 ease-in-out transition-all" />
              </a>
              <a href="https://www.facebook.com/englishvipcourse" target="_blank" rel="noopener noreferrer">
                <FaFacebookSquare className="h-6 w-6 hover:text-blue-300 duration-200 ease-in-out transition-all" />
              </a>
              <a href="https://wa.me/5582993246655" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="h-6 w-6 hover:text-blue-300 duration-200 ease-in-out transition-all" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  