'use client'

// Imports
import Menu from '@/app/Landing/Menu';
import Slides from './Slides';
import Metodo from './Metodo';
import Depoimentos from './Depoimentos';
import ComoFunciona from './ComoFunciona';
import Time from './Time';
import ComparisonTable from './Comparacao';
import Agendar from './Agendar';
import Footer from './Footer';
import MaisDepoimentos from './MaisDepoimentos';
import Image from 'next/image';

export default function Landing() {
    const openWhatsApp = () => {
        const phoneNumber = "5582993246655"; // Replace with your phone number
        window.open(`https://wa.me/${phoneNumber}`, '_blank'); // Open WhatsApp chat in a new tab
    };

    return (
        <div>
            <Menu />
            <Slides />
            <Metodo />
            <Depoimentos />
            <ComoFunciona />
            <Time />
            <ComparisonTable />
            <MaisDepoimentos />
            <Agendar />
            <Footer />

            {/* Fixed WhatsApp Button */}
            <button
                onClick={openWhatsApp}
                className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition duration-200"
            >
                <span className="flex items-center justify-center">
                    <Image 
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                        alt="WhatsApp" 
                        className="w-6 h-6"
                        width={100}
                        height={100}
                    />
                </span>
            </button>
        </div>
    );
}
