'use client';

// Next Imports
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebaseConfig';  // Import Firebase auth and Firestore db
import { doc, getDoc, setDoc, DocumentData } from "firebase/firestore";  // Firestore methods for reading and writing data

// Icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ComparisonTable: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [textContent, setTextContent] = useState<{ topText: string; bottomText: string }>({
    topText: "",
    bottomText: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Fetch the text from Firestore on initial load
    const fetchTextContent = async () => {
      const docRef = doc(db, "comparisontable", "content");  // Adjust doc path if needed
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as DocumentData;
        // Ensure the document contains the expected fields
        setTextContent({
          topText: data.topText || "",
          bottomText: data.bottomText || "",
        });
      } else {
        console.log("No such document!");
      }
    };

    fetchTextContent();

    return () => unsubscribe();
  }, []);

  const handleEditText = (key: string, value: string) => {
    setTextContent((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveTextContent = async () => {
    if (isLoggedIn) {
      try {
        const docRef = doc(db, "comparisontable", "content");
        await setDoc(docRef, textContent);  // Save the updated text to Firestore
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  return (
    <div className="text-[#505050] flex flex-col items-center p-12 gap-10 mt-12">
      {/* Title */}
      <div className="flex flex-col items-center text-center font-bold sm:text-6xl text-4xl w-full">
        <span>Veja como</span>
        <span className="text-gradient leading-tight">Nossa Escola Se Destaca</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full p-5">
        <table className="min-w-full border-collapse text-center">
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
            {/* Rows */}
            {[
              {
                description: "Aulas personalizadas aos interesses e objetivos dos alunos",
                online: true,
                presencial: false,
                particular: true,
                gravado: false,
              },
              {
                description: "Material editado a cada aula com foco nos interesses do aluno",
                online: true,
                presencial: false,
                particular: false,
                gravado: false,
              },
              {
                description: "Método exclusivo que agiliza o aprendizado",
                online: true,
                presencial: false,
                particular: false,
                gravado: true,
              },
              {
                description: "Conversação desde a primeira aula",
                online: true,
                presencial: false,
                particular: true,
                gravado: false,
              },
              {
                description: "Aulas online e ao vivo no melhor horário pro aluno",
                online: true,
                presencial: true,
                particular: false,
                gravado: false,
              },
              {
                description: "Aulas interativas, engajamento constante",
                online: true,
                presencial: true,
                particular: false,
                gravado: false,
              },
              {
                description: "Feedback em tempo real e acompanhamento individualizado",
                online: true,
                presencial: false,
                particular: true,
                gravado: false,
              },
              {
                description: "Garantia e Estrutura escolar",
                online: true,
                presencial: true,
                particular: false,
                gravado: false,
              }
            ].map((row, index) => (
              <tr key={index} className="border-b">
                <td className="border px-4 py-3 text-left">{row.description}</td>
                <td className="border px-4 py-3">
                  <span className={`inline-block w-4 h-4 rounded-full ${row.online ? 'bg-blue-600' : 'bg-gray-600'}`}></span>
                </td>
                <td className="border px-4 py-3">
                  <span className={`inline-block w-4 h-4 rounded-full ${row.presencial ? 'bg-blue-600' : 'bg-gray-600'}`}></span>
                </td>
                <td className="border px-4 py-3">
                  <span className={`inline-block w-4 h-4 rounded-full ${row.particular ? 'bg-blue-600' : 'bg-gray-600'}`}></span>
                </td>
                <td className="border px-4 py-3">
                  <span className={`inline-block w-4 h-4 rounded-full ${row.gravado ? 'bg-blue-600' : 'bg-gray-600'}`}></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
