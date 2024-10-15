'use client'

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust path as needed
import toast, { Toaster } from 'react-hot-toast'; // Importing toast and Toaster

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [faqData, setFaqData] = useState<FAQItem[]>([]); // State for FAQs
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [isEditMode, setIsEditMode] = useState(false); // State to toggle between add and edit modes
  const [currentFAQId, setCurrentFAQId] = useState<string | null>(null); // To keep track of the FAQ being edited

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Fetch existing FAQ data from Firebase
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "faqs"));
        const faqs: FAQItem[] = [];
        querySnapshot.forEach((doc) => {
          faqs.push({ id: doc.id, ...doc.data() } as FAQItem); // Including document id
        });
        setFaqData(faqs); // Set the FAQ data to the state
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);

  // Toggle FAQ display on click
  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Add a new FAQ to Firestore
  const handleAddFAQ = async () => {
    if (!newQuestion || !newAnswer) {
      toast.error("Por favor, preencha tanto a pergunta quanto a resposta.");
      return;
    }

    try {
      await addDoc(collection(db, 'faqs'), {
        question: newQuestion,
        answer: newAnswer,
      });
      setFaqData([...faqData, { id: "", question: newQuestion, answer: newAnswer }]);
      setNewQuestion('');
      setNewAnswer('');
      toast.success("Pergunta adicionada com sucesso!");
      setIsModalOpen(false); // Close the modal after successful submission
    } catch (error) {
      console.error("Erro ao adicionar pergunta:", error);
      toast.error("Erro ao adicionar pergunta. Tente novamente.");
    }
  };

  // Edit an existing FAQ
  const handleEditFAQ = async () => {
    if (!newQuestion || !newAnswer || !currentFAQId) {
      toast.error("Por favor, preencha tanto a pergunta quanto a resposta.");
      return;
    }

    try {
      const faqRef = doc(db, 'faqs', currentFAQId);
      await updateDoc(faqRef, {
        question: newQuestion,
        answer: newAnswer,
      });

      const updatedFAQs = faqData.map(faq =>
        faq.id === currentFAQId ? { ...faq, question: newQuestion, answer: newAnswer } : faq
      );

      setFaqData(updatedFAQs);
      setNewQuestion('');
      setNewAnswer('');
      setIsModalOpen(false);
      setIsEditMode(false);
      setCurrentFAQId(null);
      toast.success("Pergunta editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar pergunta:", error);
      toast.error("Erro ao editar pergunta. Tente novamente.");
    }
  };

  // Delete an FAQ from Firestore
  const handleDeleteFAQ = async (id: string) => {
    try {
      const faqRef = doc(db, 'faqs', id);
      await deleteDoc(faqRef);

      const filteredFAQs = faqData.filter(faq => faq.id !== id);
      setFaqData(filteredFAQs);

      toast.success("Pergunta deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar pergunta:", error);
      toast.error("Erro ao deletar pergunta. Tente novamente.");
    }
  };

  return (
    <div>
      <Toaster /> {/* Add Toaster here */}

     
      <div id="perguntas" className="text-[#505050] flex flex-col items-center p-10">
        <div className="flex flex-col items-start">
          <p className="text-5xl font-semibold text-center">
            Perguntas <span className="text-gradient">frequentes</span>
          </p>
        </div>

        <div className="w-full mt-10 px-12 space-y-4">
          {faqData.map((faq, index) => (
            <div key={faq.id} className="border-b-2 border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  {faq.question}
                </h2>
                <span className="text-2xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>

              <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                  activeIndex === index ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </div>

              {/* Edit and Delete Buttons */}
              {isLoggedIn && 
              <div className="flex justify-start items-center gap-2 mt-2">
                <button
                  onClick={() => {
                    setIsEditMode(true);
                    setIsModalOpen(true);
                    setCurrentFAQId(faq.id);
                    setNewQuestion(faq.question);
                    setNewAnswer(faq.answer);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-1 px-4 rounded-lg duration-300 transition-all ease-in-out"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteFAQ(faq.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded-lg duration-300 transition-all ease-in-out"
                >
                  Deletar
                </button>
              </div>}
            </div>
          ))}
        </div>

        
        {/* Add New FAQ Button */}
        {isLoggedIn &&
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal when clicked
          className="mt-8 text-white bg-green-500 hover:bg-green-600 py-2 px-4 font-semibold rounded-md duration-300 transition-all ease-in-out"
        >
          Adicionar Pergunta
        </button>}
      </div>

      {/* Modal for Adding or Editing FAQ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 m-4">
            <h3 className="text-lg font-semibold">{isEditMode ? 'Editar Pergunta' : 'Adicionar Nova Pergunta'}</h3>
            <input
              type="text"
              placeholder="Pergunta"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <textarea
              placeholder="Resposta"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
              rows={4}
            />
            <div className="flex flex-row items-center justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg ml-2 duration-300 transition-all ease-in-out"
              >
                Cancelar
              </button>
              <button
                onClick={isEditMode ? handleEditFAQ : handleAddFAQ}
                className="text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md duration-300 transition-all ease-in-out"
              >
                {isEditMode ? 'Salvar' : 'Adicionar Pergunta'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
