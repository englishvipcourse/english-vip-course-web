'use client';

// Next Imports
import React from "react";

// Icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ComparisonTable: React.FC = () => {
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

            <div className="w-screen h-full sm:gap-2 gap-10 flex sm:flex-row flex-col items-start justify-between sm:py-28 py-16 px-16 mt-10 bg-blue-900 text-white">
                <p className="text-xl md:text-3xl font-semibold sm:leading-[50px] leading-[40px] sm:text-left text-center">
                    A nossa escola online se destaca por oferecer um ensino de <span className="bg-red-600 leading-normal">inglês altamente personalizado</span> e adaptado às necessidades e interesses específicos de cada aluno.
                </p>
                <p className="leading-loose text-sm md:text-base sm:text-right text-center sm:px-20 p-0">
                    Nossa escola de inglês online é estruturada para atender às necessidades específicas de cada aluno, oferecendo um método personalizado, flexível e eficaz que transforma o aprendizado do inglês em uma experiência agradável e recompensadora. Estamos comprometidos em ajudar nossos alunos a alcançar seus objetivos com confiança e segurança.
                </p>
            </div>

        </div>
    );
};

export default ComparisonTable;
