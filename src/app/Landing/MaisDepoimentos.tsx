'use client';

import { useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { db } from '../firebaseConfig'; // Import Firebase config
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import toast, { Toaster } from "react-hot-toast";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig';

const MaisDepoimentos: React.FC = () => {
    const [videos, setVideos] = useState<string[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3); // Default to show 3 videos
    const [newVideoUrl, setNewVideoUrl] = useState(""); // State for new video URL input

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      // Check if user is logged in
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(!!user);
      });
  
      return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Fetch videos from Firebase when the component mounts
        const fetchVideos = async () => {
            const querySnapshot = await getDocs(collection(db, "videos"));
            const videoUrls: string[] = [];
            querySnapshot.forEach((doc) => {
                videoUrls.push(doc.data().url);
            });
            setVideos(videoUrls);
        };

        fetchVideos();

        const handleResize = () => {
            setVisibleCount(window.innerWidth < 768 ? 1 : 3); // Update visible count based on window size
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize); // Update on resize

        return () => window.removeEventListener('resize', handleResize); // Cleanup
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + visibleCount) % videos.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? videos.length - visibleCount : prevSlide - visibleCount));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index * visibleCount);
    };

    const handleAddVideo = async () => {
        if (newVideoUrl.trim()) {
            try {
                // Save video URL to Firestore
                await addDoc(collection(db, "videos"), {
                    url: newVideoUrl
                });

                setVideos([...videos, newVideoUrl]); // Update the local state
                setNewVideoUrl(""); // Clear the input field
                toast.success("Vídeo adicionado!")
            } catch (error) {
                console.error("Error adding video:", error);
            }
        }
    };

    const handleDeleteVideo = async (index: number) => {
        const videoUrl = videos[index];

        try {
            // Delete video from Firestore
            const querySnapshot = await getDocs(collection(db, "videos"));
            querySnapshot.forEach((doc) => {
                if (doc.data().url === videoUrl) {
                    deleteDoc(doc.ref); // Delete the document
                }
            });

            setVideos(videos.filter((_, i) => i !== index)); // Update local state
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };

    const handleClearVideos = async () => {
        try {
            // Delete all videos from Firestore
            const querySnapshot = await getDocs(collection(db, "videos"));
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref); // Delete the document
            });

            setVideos([]); // Clear the local state
            setCurrentSlide(0); // Reset to the first slide
        } catch (error) {
            console.error("Error clearing videos:", error);
        }
    };

    return (
        <div className="text-[#505050] flex flex-col items-center">
            <Toaster />

            <div className="flex flex-col items-center font-bold sm:text-6xl text-4xl w-full p-8">
                <span>Veja o que mais</span>
                <span className="text-gradient leading-tight">Alunos dizem</span>
            </div>

            <div className="relative w-[85vw] h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="flex transition-transform duration-500 gap-4" style={{ transform: `translateX(-${currentSlide * (100 / visibleCount)}%)` }}>
                    {videos.map((videoUrl, index) => (
                        <div key={index} className={`flex-shrink-0 aspect-video ${visibleCount === 1 ? 'w-full' : 'w-1/3'} h-auto`}>
                            <iframe
                                width="100%"
                                height="100%"
                                src={videoUrl}
                                title={`Depoimento ${index + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                            {isLoggedIn &&
                            <button
                                onClick={() => handleDeleteVideo(index)}
                                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 rounded-full p-2"
                            >
                                🗑️
                            </button>}
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
                    {Array.from({ length: Math.ceil(videos.length / visibleCount) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-12 h-3 rounded-lg ${index * visibleCount === currentSlide ? 'bg-sky-400' : 'bg-gray-200'} transition-all duration-300`}>
                        </button>
                    ))}
                </div>
            </div>

            {isLoggedIn &&
            <div className="mt-4 flex flex-row gap-2 items-center">
                <input
                    type="text"
                    placeholder="Insira o URL do vídeo"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-600"
                />
                <button
                    onClick={handleAddVideo}
                    className="mt-2 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
                >
                    Adicionar Vídeo
                </button>
            </div>}

            {isLoggedIn &&
            <div className="mt-4">
                <button
                    onClick={handleClearVideos}
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
                >
                    Apagar Todos os Vídeos
                </button>
            </div>}
        </div>
    );
};

export default MaisDepoimentos;
