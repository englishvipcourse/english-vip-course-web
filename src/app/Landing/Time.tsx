import Image from "next/image";

import aula1 from '../../../images/time/Isabela-scaled.jpg';
import aula2 from '../../../images/time/luan-scaled.jpg';
import aula3 from '../../../images/time/flavia.jpg';

export default function Time() {
    return (
        <div className="bg-blue-50 text-[#505050] flex flex-col items-center h-full">
            <div className="flex flex-col items-center font-bold sm:text-6xl text-4xl w-full p-20">
                <span>Conheça</span>
                <span className="text-gradient">Nosso Time</span>
            </div>

            <div className="w-screen flex flex-wrap justify-center gap-28 p-4">
                <div className="w-max flex flex-col items-center justify-between gap-2">
                    <Image src={aula2} alt={""} className="h-80 w-72 object-cover rounded-2xl" />
                    <span className="w-72 text-center">Estou na área acadêmica desde os meus 18 anos. A ideia da English Vip course veio de ver que a grande necessidade dos alunos com inglês não estava sendo suprida pelas opções que existiam, entender que cada aluno é único e deve aprender no seu ritmo e abordando o que gosta tornando o aprendizado prazeroso e capaz de produzir os melhores resultados.</span>
                    <div className="flex flex-col items-center gap-0">
                        <p className="text-blue-700 font-semibold">Luan Carlos</p>
                        <p className="-mt-2">Diretor</p>
                    </div>
                </div>

                <div className="w-max flex flex-col items-center justify-between gap-2">
                    <Image src={aula3} alt={""} className="h-80 w-72 object-cover rounded-2xl" />
                    <span className="w-72 text-center">Meu amor pelo inglês começou bem cedo, porque meus pais ouviam muita música em inglês em casa, como Phil Collins, Lionel Richie, Celine Dion...Comecei a ensinar inglês em 2018. Na época, eu estava estudando para concurso público quando duas amigas da minha irmã me pediram para dar umas aulas a domicílio para seus filhos.</span>
                    <div className="flex flex-col items-center gap-0">
                        <p className="text-blue-700 font-semibold">Flávia</p>
                        <p className="-mt-2">Professora</p>
                    </div>
                </div>

                <div className="w-max flex flex-col items-center justify-between gap-2">
                    <Image src={aula1} alt={""} className="h-80 w-72 object-cover rounded-2xl" />
                    <span className="w-72 text-center">Comecei a estudar inglês aos 11 anos. Sempre gostei de assistir filmes e séries legendados, foi um dos motivos que me fez querer aprender inglês. Friends é minha série favorita e me ajudou muito a aperfeiçoar minha fluência. Gosto muito de aprender sobre outras culturas seja lendo, pesquisando ou viajando.</span>
                    <div className="flex flex-col items-center gap-0">
                        <p className="text-blue-700 font-semibold">Isabela</p>
                        <p className="-mt-2">Professora</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
