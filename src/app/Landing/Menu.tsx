'use client'

import { useEffect, useState } from 'react'; // Import useState
import Image from "next/image";

import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from 'firebase/auth';

//Icons
import { CgClose } from "react-icons/cg";
import { TbLogout2, TbMenu2 } from "react-icons/tb";
import { LuDoorOpen } from "react-icons/lu";

//Images
import Logo from '../../../images/cropped-logo-english.png';

export default function Landing() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // Check if user is logged in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        });

        return () => unsubscribe();
      }, []);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
        }
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
                <div className="hidden lg:flex flex-row gap-12 items-center justify-between text-[#222222] text-[14.4px]">
                    <a href='#nosso-metodo'><p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Nosso Método</p></a>
                    <a href='#nosso-time'><p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Nosso Time</p></a>
                    <a href='#depoimentos'><p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Depoimentos</p></a>
                    <a href='#perguntas'><p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Perguntas Frequentes</p></a>
                    <a href='#contato'><p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Contato</p></a>
                    {!isLoggedIn &&<a href='/login'><button className="ml-20 text-[15.5px] flex flex-row gap-1 items-center text-blue-950 font-semibold hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer"><LuDoorOpen /> Login</button></a>}
                    {isLoggedIn && (
                        <div className="flex flex-row gap-2 items-center">
                            <p className='text-black text-xs font-bold bg-blue-500 hover:bg-blue-600 duration-300 ease-in-out transition-all rounded-lg py-2 px-2'>Admin Mode</p>
                            <button 
                            onClick={handleLogout}
                            className="flex flex-row gap-1 items-center text-black text-xs font-bold bg-red-400 hover:bg-red-500 duration-300 ease-in-out transition-all rounded-lg py-2 px-2"
                            >
                            <TbLogout2 className='w-4 h-4' /> Sair
                        </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar - Appears when toggled */}
            <div className={`fixed top-0 left-0 w-80 h-full bg-white z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
                <div className="p-5">
                    <div className='flex flex-row items-center justify-between w-full'>
                    <button onClick={toggleSidebar} className="text-[#222222] mb-4">
                        <CgClose className="w-8 h-8 hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer" />
                    </button>
                    <Image src={Logo} alt={""} />
                    <button onClick={toggleSidebar} className="text-white mb-4">
                        <CgClose className="w-8 h-8 hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer" />
                    </button>
                    </div>
                    <div className='flex flex-col items-center justify-between h-full p-6 mt-6 text-[#222222]'>
                        <div className='flex flex-col items-center gap-10'>
                        <a href='#nosso-metodo'><p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Nosso Método</p></a>
                        <a href='#nosso-time'><p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Nosso Time</p></a>
                        <a href='#depoimentos'><p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Depoimentos</p></a>
                        <a href='#perguntas'><p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Perguntas Frequentes</p></a>
                        <a href='#contato'><p className="hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer">Contato</p></a>
                        </div>
                        {!isLoggedIn &&<a href='/login'><button className="flex text-lg flex-row mt-20 gap-1 items-center text-blue-800 font-semibold hover:text-[#0693e3] transition-all ease-in-out duration-200 cursor-pointer"><LuDoorOpen className='w-6 h-6' /> Login</button></a>}
                        {isLoggedIn && (
                        <div className="flex flex-col mt-8 gap-2 items-center">
                            <p className='text-black text-xs font-bold bg-blue-500 hover:bg-blue-600 duration-300 ease-in-out transition-all rounded-lg py-2 px-2'>Admin Mode</p>
                            <button 
                            onClick={handleLogout}
                            className="flex flex-row gap-1 items-center text-black text-xs font-bold bg-red-400 hover:bg-red-500 duration-300 ease-in-out transition-all rounded-lg py-2 px-2"
                            >
                            <TbLogout2 className='w-4 h-4' /> Sair
                        </button>
                        </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay when sidebar is open */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleSidebar}></div>}
        </div>
    )
}
