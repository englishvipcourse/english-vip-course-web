// Signup.js
'use client';
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import toast, {Toaster} from 'react-hot-toast';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success('Signup feito com sucesso! Faça o login.');
            // Optionally redirect to login page or home page
        } catch (err) {
            const error = err as Error; // Cast to Error type
            toast.error(error.message); // Display error message using toast
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Toaster />
            <div className="w-max p-8 rounded-lg bg-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-700">Registrar</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4 mt-4">
                        <input 
                            type="email" 
                            placeholder="Seu email@email.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="password" 
                            placeholder="Sua senha" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition=all ease-in-out duration-300"
                    >
                        Sign Up
                    </button>
                    <a href="/login" className="mt-2 py-3 rounded-lg flex flex-col items-center bg-blue-600 hover:bg-blue-800 justify-center font-bold text-white duration-300 ease-in-out transition-all">Log In</a>
                </form>
            </div>
        </div>
    );
};

export default Signup;
