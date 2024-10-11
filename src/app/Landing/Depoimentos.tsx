import Image from "next/image";
import { useState, useEffect } from "react";

import Depoimento1 from '../../../images/depoimentos/patricia.png';
import Depoimento2 from '../../../images/depoimentos/pedro.png';
import Depoimento3 from '../../../images/depoimentos/andre-lukas.png';
import Depoimento4 from '../../../images/depoimentos/indalecio.png';
import Depoimento5 from '../../../images/depoimentos/jamille-melo.png';

const testimonials = [
    { image: Depoimento1, name: "Patrícia", description: "Good morning! I am fine! Estou muito feliz por estar evoluindo na medida do possível rsrs As aulas estão sendo excelentes! A teacher é muito boa e está ajudando muito na nossa evolução." },
    { image: Depoimento2, name: "Pedro", description: "Meu amigo, que aula massa ontem!!! Fiquei feliz demais com a participação da outra teacher e vê que meu inglês tá destravado rsrsrsrs obrigado por tá me dando a segurança de saber que EU POSSO conversar com outras pessoas em inglês!! Que venham mais aulas e mais aprendizados a cada dia!!!" },
    { image: Depoimento3, name: "Andre Lukas", description: "Gostaria de mandar essa mensagem para lhe agradecer por tudo. Percebi uma evolução muito grande no meu inglês. Consegui compreender melhor os filmes, músicas e conversas em inglês. Por trazer assuntos atualizados com diversos temas diferentes, fez aumentar meu vocabulário. A metodologia aplicada com exercícios de listening, reading e speaking ao longo da aula, ajudou demais no meu desenvolvimento. Aprendi gramática sem precisar ficar decorando, como é ensinado nesses cursinhos padrões. Sou muito grato. Um excelente curso de inglês. Acredito que foi o melhor que já tive. Super indico!!!! Desejo muito sucesso!!!!" },
    { image: Depoimento4, name: "Indalecio", description: "2021 marcou minha volta ao estudo do inglês, agora em tempos de pandemia, através de aulas on-line, que foram muito bem assimiladas e integradas na minha rotina. Eu consegui uma rápida adaptação a metodologia empregada pelo professor, que vem conseguindo aprimorar minhas habilidades linguísticas através da transferência de conhecimento, dicas e direcionamento nos estudos. O objetivo de conseguir fluência está mais próxima. Curiosidade: Luan foi indicado a mim por meu filho, que tem fluência no inglês e Luan tem mérito nesta trajetória. Recomendo-o." },
    { image: Depoimento5, name: "Jamille Melo", description: "Gostaria de te agradecer por ter me preparado tão bem para que eu conseguisse fazer minha Eurotrip, sem grande perrengues. Toda preparação foi essencial para que eu destravasse ao chegar lá e conseguisse me comunicar e avançar ainda mais no inglês. Obrigada pela paciência e por todas as estratégias para conciliar as minhas necessidades de estudos entre assuntos do trabalho e viagem. Vocês são top!!" },
];

export default function Depoimentos() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Check if the viewport is mobile
    const checkViewport = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => window.removeEventListener('resize', checkViewport);
    }, []);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    // Determine how many testimonials to display
    const testimonialsToShow = isMobile ? 1 : 3;

    return (
        <div id="depoimentos" className="text-[#505050] flex flex-col gap-4 items-center justify-center p-8">
            <div className="flex flex-col gap-2 items-center sm:text-5xl text-3xl text-center">
                <p className="font-bold">Transformações <span className="text-gradient">reais</span></p>
                <p className="text-base font-medium">Histórias de Sucesso de Nossos Alunos</p>
            </div>

            <div className="flex flex-col items-center p-8 lg:px-20">
                <div className="flex gap-4 justify-center">
                    {testimonials.slice(currentIndex, currentIndex + testimonialsToShow).map((testimonial, index) => (
                        <div key={index} className="flex flex-col items-center w-full rounded-lg p-4 text-center">
                            <Image src={testimonial.image} alt={testimonial.name} className="mb-4 w-36 rounded-full" />
                            <span className="text-gray-600">{testimonial.description}</span>
                            <span className="font-bold text-sky-500">{testimonial.name}</span>
                        </div>
                    ))}
                </div>

                <div className="flex mt-4">
                    {Array.from({ length: Math.ceil(testimonials.length / testimonialsToShow) }).map((_, index) => (
                        <button
                            key={index}
                            className={`w-10 h-3 mx-1 rounded-xl ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
