'use client'

import { useState } from 'react'; // Import useState
import Image from "next/image";

//Icons
import { CgClose } from "react-icons/cg";
import { TbMenu2 } from "react-icons/tb";

//Images
import Logo from '../../../images/cropped-logo-english.png';

export default function Landing() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <div className="min-w-screen h-full bg-white flex flex-row items-center justify-between py-5 px-12">
                <div>
                    <Image className="min-w-[92%]" src={Logo} alt={"Logo"} />
                </div>

                {/* Mobile menu button */}
                <div className="lg:hidden">
                    <button onClick={toggleSidebar} className="text-[#222222] focus:outline-none">
                        {/* Conditionally render the icons */}
                        {isSidebarOpen ? (
                            <CgClose className="w-8 h-8 hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer" />
                        ) : (
                            <TbMenu2 className="w-8 h-8 hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer" />
                        )}
                    </button>
                </div>

                {/* Regular Menu - Hidden on mobile */}
                <div className="hidden lg:flex flex-row gap-12 justify-between text-[#222222] text-[14.4px]">
                    <p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Nosso Método</p>
                    <p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Nosso Time</p>
                    <p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Depoimentos</p>
                    <p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Perguntas Frequentes</p>
                    <p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Contato</p>
                </div>
            </div>

            {/* Sidebar - Appears when toggled */}
            <div className={`fixed top-0 left-0 w-80 h-full bg-white z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
                <div className="p-5">
                    <button onClick={toggleSidebar} className="text-[#222222] mb-4">
                        <CgClose className="w-8 h-8 hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer" />
                    </button>
                    <div className='flex flex-col items-center gap-10 p-6 text-[#222222]'>
                        <p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Nosso Método</p>
                        <p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Nosso Time</p>
                        <p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Depoimentos</p>
                        <p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Perguntas Frequentes</p>
                        <p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Contato</p>
                    </div>
                </div>
            </div>

            {/* Overlay when sidebar is open */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleSidebar}></div>}
        </div>
    )
}
