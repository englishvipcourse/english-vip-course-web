import Image from "next/image";

// Images
import Icon1 from '../../../images/metodo/icon-group-1.png';
import Icon2 from '../../../images/metodo/icon-group-2.png';
import Icon3 from '../../../images/metodo/icon-group-3.png';
import Icon4 from '../../../images/metodo/icon-group-4.png';
import Icon5 from '../../../images/metodo/icon-group-5.png';
import Icon6 from '../../../images/metodo/icon-group-6.png';
import Icon7 from '../../../images/metodo/icon-group-7.png';

export default function Metodo() {
    return (
        <div id="nosso-metodo" className="text-[#505050] sm:p-8">
            <div className="lg:flex lg:flex-row sm:flex sm:flex-col items-center sm:p-28 sm:px-38 p-6 px-6 w-full h-full">
                <div className="flex flex-col sm:items-start items-center font-bold sm:text-6xl text-4xl w-full">
                    <span>Personalizado,</span>
                    <span className="text-gradient">flexível e eficaz</span>
                    </div>

                <div className="sm:text-right text-center leading-8">
                    <span className="text-black">Descubra o Diferencial da Nossa Escola: domine o inglês de forma rápida, eficiente e abra portas para oportunidades globais.</span>
                </div>
            </div>

            {/* Cards Container */}
            <div className="flex flex-wrap items-start justify-center gap-8 p-8">
                {/* Card for each icon and description */}
                {[ 
                    {
                        src: Icon1,
                        title: "Método de Aprendizado Exclusivo",
                        description: "Nosso curso foca na conversação e é adaptado ao ritmo e às necessidades individuais de cada aluno, proporcionando uma experiência de aprendizado mais eficaz."
                    },
                    {
                        src: Icon2,
                        title: "Aulas Online Flexíveis",
                        description: "Com aulas online, os alunos podem estudar de qualquer lugar e a qualquer hora, eliminando a barreira de tempo e localização."
                    },
                    {
                        src: Icon3,
                        title: "Ambiente de Aprendizado Acolhedor",
                        description: "Criamos um ambiente onde os alunos se sentem confortáveis para cometer erros e aprender com eles, diminuindo a ansiedade e aumentando a confiança."
                    },
                    {
                        src: Icon4,
                        title: "Material Exclusivo e Atualizado",
                        description: "Utilizamos materiais únicos e constantemente atualizados, focados em situações reais de uso da língua, tornando o aprendizado mais relevante."
                    },
                    {
                        src: Icon5,
                        title: "Feedback Construtivo e Sincero",
                        description: "Oferecemos feedback honesto e construtivo, ajudando os alunos a identificar áreas de melhoria e a fazer progressos reais."
                    },
                    {
                        src: Icon6,
                        title: "Foco na Conversação",
                        description: "Nossa metodologia dá ênfase à prática de conversação, ajudando os alunos a internalizar o uso do inglês de maneira natural e eficaz."
                    },
                    {
                        src: Icon7,
                        title: "Preparação para Situações Reais",
                        description: "Preparamos os alunos para utilizar o inglês em contextos reais, como viagens internacionais e progressos no trabalho."
                    }
                ].map((card, index) => (
                    <div key={index} className="flex flex-col items-center w-64 rounded-lg p-4 text-center">
                        <Image src={card.src} alt={"Imagem"} className="mb-4" />
                        <span className="font-bold text-sky-500">{card.title}</span>
                        <span className="text-gray-600">{card.description}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
