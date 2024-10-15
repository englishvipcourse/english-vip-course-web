'use client';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firestore instance
import Image from 'next/image';
import Logo from '../../../images/cropped-logo-english.png';
import { TbLogout2 } from "react-icons/tb";

interface Schedule {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: any; // Timestamp type from Firestore
}

const AdminPage: React.FC = () => {
    const router = useRouter();
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);  // State to store the authenticated user

    useEffect(() => {
        // Check if the user is authenticated
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push('/login'); // Redirect to login if not authenticated
            } else {
                setUser(currentUser); // Set user state if authenticated
            }
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, [router]);

    useEffect(() => {
        const fetchSchedules = async () => {
            const schedulesCollection = collection(db, 'schedules');
            const scheduleSnapshot = await getDocs(schedulesCollection);
            const scheduleList = scheduleSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Schedule[];

            setSchedules(scheduleList);
        };

        fetchSchedules();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Até mais!');
            router.push('/login'); // Redirect to the login page after logout
        } catch (error) {
            toast.error('Falha. Tente novamente.');
        }
    };

    const handleEditar = async () => {
        router.push('/');
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'schedules', id));
            setSchedules(schedules.filter(schedule => schedule.id !== id)); // Remove deleted item from state
            toast.success('Agendamento excluído com sucesso!');
        } catch (error) {
            toast.error('Falha ao excluir. Tente novamente.');
        } finally {
            setShowModal(false); // Close the modal after deletion
        }
    };

    const openModal = (id: string) => {
        setScheduleToDelete(id);
        setShowModal(true);
    };

    const formatDate = (timestamp: any) => {
        const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
        return date.toLocaleString('pt-BR', {
            timeZone: 'UTC',
            hour12: false,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen p-2 bg-blue-100 text-black">
            <Toaster />
            <div className="bg-white p-4 rounded-lg shadow-md w-full h-full overflow-hidden">
                <div className='flex sm:flex-row flex-col items-center justify-between w-full p-2 mb-6'>
                    <Image src={Logo} alt={""} className='w-[50%] h-[50%] pb-6 sm:hidden inline' />
                    <div className='flex sm:flex-row flex-col items-center justify-between w-full h-full'>
                        <Image src={Logo} alt={""} className='w-[12%] h-[12%] sm:inline hidden' />
                        <h1 className="sm:text-3xl text-lg font-bold text-left w-max">Painel de Administrador</h1>
                        <div className='flex flex-row items-center gap-1'>
                            <button 
                                onClick={handleEditar}
                                className="w-max py-2 px-3 bg-green-600 flex flex-row items-center gap-2 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
                            >
                                Editar Página
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="w-max py-2 px-3 bg-red-600 flex flex-row items-center gap-2 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
                            >
                                <TbLogout2 className='w-6 h-6' /> Sair
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[75vh] overflow-y-auto p-2 bg-gray-200 rounded-lg flex flex-col items-center justify-start'>
                    <p className='font-semibold'>Agendamentos de Aula</p>
                    <div className='flex flex-col gap-1 text-sm p-2 w-full'>
                        {schedules.length === 0 ? (
                            <p>Nenhum agendamento encontrado.</p>
                        ) : (
                            schedules.map(schedule => (
                                <div key={schedule.id} className='bg-gray-300 hover:bg-gray-400 duration-200 ease-in-out transition-all rounded-lg p-2 flex sm:flex-row flex-col gap-2 justify-between items-center border-b py-2'>
                                    <div>
                                        <p>Nome: {schedule.name}</p>
                                        <p>Email: {schedule.email}</p>
                                        <p>Número: {schedule.phone}</p>
                                        <p>Data: {formatDate(schedule.createdAt)}</p>
                                    </div>
                                    <button 
                                        onClick={() => openModal(schedule.id)}
                                        className="ml-4 py-1 px-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-200"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-md m-8">
                        <h2 className="text-lg font-bold">Confirmar Exclusão</h2>
                        <p>Você tem certeza que deseja excluir este agendamento?</p>
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={() => setShowModal(false)} 
                                className="mr-2 py-1 px-3 bg-gray-300 font-semibold rounded hover:bg-gray-400 duration-300 ease-in-out transition-all"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={() => scheduleToDelete && handleDelete(scheduleToDelete)}
                                className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700 duration-300 ease-in-out transition-all"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
