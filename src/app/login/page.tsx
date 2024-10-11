'use client';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Imagem from '../../../images/login-photo.jpg';
import Logo from '../../../images/cropped-logo-english.png';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from "react-icons/io";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true); // Start loading when form is submitted

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Bem-vindo!');
            
            if (rememberMe) {
                localStorage.setItem('email', email);
            } else {
                localStorage.removeItem('email');
            }
            router.push('/admin'); // Redirect to admin page after successful login
        } catch (err) {
            const error = err as Error;
            toast.error("Erro ao logar");
        } finally {
            setIsLoading(false); // Stop loading after login is done
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            toast.error('Por favor, insira seu email.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Email de recuperação enviado. Por favor, verifique a caixa de entrada.');
        } catch (err) {
            const error = err as Error;
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-100 text-black">
            <Toaster />
            <a href='/' className='absolute top-4 left-4 cursor-pointer'>
                <IoIosArrowBack className='w-8 h-8 text-blue-600 hover:text-blue-700 duration-300 ease-in-out transition-all' />
            </a>
            <div className="w-full h-full flex flex-col items-center justify-center p-8 rounded-lg sm:mb-0 mb-20">
                <Image src={Logo} alt="Logo" className='m-8 w-64' />
                <form className='w-[85%]' onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input 
                            type="email" 
                            placeholder="Seu email@email.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="password" 
                            placeholder="Sua senha" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <input 
                            type="checkbox" 
                            id="remember" 
                            checked={rememberMe} 
                            onChange={() => setRememberMe(!rememberMe)} 
                            className="mr-2" 
                        />
                        <label htmlFor="remember" className="text-gray-700">Remember me</label>
                    </div>
                    <button 
                        type="submit" 
                        className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg transition duration-200 flex justify-center items-center ${isLoading ? 'cursor-not-allowed opacity-75' : 'hover:bg-blue-700'}`}
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                        ) : (
                            'Entrar'
                        )}
                    </button>
                    <p className="text-center mt-4">
                        <button 
                            type="button" 
                            onClick={handleForgotPassword} 
                            className="text-blue-600 hover:underline"
                        >
                            Esqueceu a senha?
                        </button>
                    </p>
                </form>
            </div>
            <div className='w-full h-full sm:flex hidden'>
                <Image src={Imagem} alt="Background" className='w-full h-full object-cover' />
            </div>
        </div>
    );
};

export default Login;
