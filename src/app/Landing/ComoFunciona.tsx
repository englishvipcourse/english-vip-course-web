import Image from "next/image"

import aula1 from '../../../images/funciona/aula-experimental.jpg'
import aula2 from '../../../images/funciona/aula-experimental1.jpg'
import aula3 from '../../../images/funciona/aula-experimental2.jpg'

export default function ComoFunciona(){
    return(
            <div id="quem-somos" className="bg-blue-50 text-[#505050] flex flex-col items-center h-full">
                <div className="flex flex-col items-center font-bold sm:text-6xl text-4xl w-full p-20">
                    <span>Como funciona</span>
                    <span className="text-gradient">a English Vip Course</span>
                </div>

                <div className="w-full flex flex-wrap justify-around p-4">
                    <div className="sm:w-[25%] w-full h-[50%] flex flex-col items-start gap-2">
                        <p className="text-5xl font-bold text-gradient">1</p>
                        <p className="text-2xl font-bold">Agende uma</p>
                        <p className="-mt-2 text-2xl font-bold text-gradient">Aula Experimental</p>
                        <Image src={aula1} alt={""} className="h-full w-full rounded-3xl" />
                        <span className="text-justify mt-3">Dê o primeiro passo rumo à fluência. Não importa se você está começando do zero ou já possui algum conhecimento. Nossa equipe está pronta para atender você!</span>
                    </div>

                    <div className="sm:w-[25%] w-full flex h-[50%] flex-col items-start gap-2">
                        <p className="text-5xl font-bold text-gradient">2</p>
                        <p className="text-2xl font-bold">Personalize seu</p>
                        <p className="-mt-2 text-2xl font-bold text-gradient">Plano de Estudos</p>
                        <Image src={aula2} alt={""} className="h-full w-full rounded-3xl"/>
                        <span className="text-justify mt-3">Conte-nos seus objetivos e personalizaremos todas as suas aulas. Flexibilidade total: Escolha os melhores dias e horários que se encaixem na sua rotina. Adaptamos o curso às suas necessidades.</span>
                    </div>

                    <div className="sm:w-[25%] w-full flex h-[50%] flex-col items-start gap-2">
                        <p className="text-5xl font-bold text-gradient">3</p>
                        <p className="text-2xl font-bold">Comece suas</p>
                        <p className="-mt-2 text-2xl font-bold text-gradient">Aulas Imediatamente</p>
                        <Image src={aula3} alt={""} className="h-full w-full rounded-3xl"/>
                        <span className="text-justify mt-3">Fale inglês desde a primeira aula: Nada de esperar! Comece a se comunicar em inglês desde o primeiro encontro. Aulas práticas e interativas garantindo que você se sinta confiante e motivado a cada passo.</span>
                    </div>
                </div>

                <div className="sm:flex sm:flex-row flex flex-col items-center justify-around w-screen bg-blue-900 h-fit px-8 py-20 mt-20 gap-4">
                    <div>
                        <p className="text-white font-bold text-left text-3xl">Agende agora uma aula gratuita <br/> <span className="bg-red-700">ou tire qualquer dúvida</span></p>
                    </div>
                    <div>
                        <a href="https://api.whatsapp.com/send?phone=5582993246655"><button className="bg-white hover:bg-blue-50 transition-all ease-in-out duration-300 font-bold text-blue-900 rounded-full text-md sm:py-6 sm:px-28 py-4 px-12 tracking-widest">ENTRE EM CONTATO</button></a>
                    </div>
                </div>
            </div>

    )
}