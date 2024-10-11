import Image from "next/image"

import aula1 from '../../../images/funciona/aula-experimental.png'
import aula2 from '../../../images/funciona/aula-experimental1.png'
import aula3 from '../../../images/funciona/aula-experimental2.png'

export default function ComoFunciona(){
    return(
            <div className="bg-blue-50 text-[#505050] flex flex-col items-center h-full">
                <div className="flex flex-col items-center font-bold sm:text-6xl text-4xl w-full p-20">
                    <span>Como funciona</span>
                    <span className="text-gradient">a English Vip Course</span>
                </div>

                <div className="w-full flex flex-wrap justify-center gap-8 p-4">
                    <div className="sm:w-[30%] w-full flex flex-col items-start gap-2">
                        <p className="text-5xl font-bold text-blue-600">1</p>
                        <p className="text-2xl font-bold">Agende uma</p>
                        <p className="-mt-2 text-2xl font-bold text-blue-600">Aula Experimental</p>
                        <Image src={aula1} alt={""} className="h-full w-full" />
                        <span className="text-justify">Dê o primeiro passo rumo à fluência. Não importa se você está começando do zero ou já possui algum conhecimento. Nossa equipe está pronta para atender você!</span>
                    </div>

                    <div className="sm:w-[30%] w-full flex flex-col items-start gap-2">
                        <p className="text-5xl font-bold text-blue-600">2</p>
                        <p className="text-2xl font-bold">Personalize seu</p>
                        <p className="-mt-2 text-2xl font-bold text-blue-600">Plano de Estudos</p>
                        <Image src={aula2} alt={""} className="h-full w-full"/>
                        <span className="text-justify">Conte-nos seus objetivos e personalizaremos todas as suas aulas. Flexibilidade total: Escolha os melhores dias e horários que se encaixem na sua rotina. Adaptamos o curso às suas necessidades.</span>
                    </div>

                    <div className="sm:w-[30%] w-full flex flex-col items-start gap-2">
                        <p className="text-5xl font-bold text-blue-600">3</p>
                        <p className="text-2xl font-bold">Comece suas</p>
                        <p className="-mt-2 text-2xl font-bold text-blue-600">Aulas Imediatamente</p>
                        <Image src={aula3} alt={""} className="h-full w-full"/>
                        <span className="text-justify">Fale inglês desde a primeira aula: Nada de esperar! Comece a se comunicar em inglês desde o primeiro encontro. Aulas práticas e interativas garantindo que você se sinta confiante e motivado a cada passo.</span>
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