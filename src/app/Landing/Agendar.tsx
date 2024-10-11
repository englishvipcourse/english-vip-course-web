'use client'
import { useState } from "react";
import { InstagramEmbed } from 'react-social-media-embed';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ajuste o caminho conforme necessário
import toast, { Toaster } from 'react-hot-toast'; // Importando toast e Toaster

interface FAQItem {
  question: string;
  answer: string;
}

export default function Agendar() {
  const faqData: FAQItem[] = [
    {
      question: 'As aulas são em turmas ou individuais?',
      answer: 'Nossas aulas são principalmente individuais e personalizadas, focadas nas necessidades e objetivos de cada aluno para garantir o máximo aproveitamento. Em alguns casos, duplas podem ser formadas, como amigos, casais ou irmãos que estão no mesmo nível de inglês e desejam estudar juntos.',
    },
    {
      question: 'Quem será meu professor(a)?',
      answer: 'Todos os nossos professores são altamente qualificados, com experiência específica no ensino de inglês. Você será designado a um professor que melhor se alinhe aos seus objetivos e nível de conhecimento.',
    },
    {
      question: 'Qual preço das aulas?',
      answer: 'Os preços das aulas variam conforme a frequência e a personalização. Oferecemos pacotes semestrais e anuais. Entre em contato para mais detalhes e um orçamento personalizado.',
    },
    {
      question: 'Posso remarcar ou cancelar as aulas?',
      answer: 'Sim, entendemos que imprevistos acontecem. Permitimos o cancelamento de aulas com algumas horas de antecedência sem custo adicional. Entre em contato conosco para mais detalhes sobre a política de cancelamento.',
    },
    {
      question: 'Como funciona a avaliação do meu progresso?',
      answer: 'A avaliação é contínua e personalizada. Após cada aula, você recebe feedback detalhado e uma análise do seu progresso. Fazemos uma revisão geral antes de cada novo módulo para garantir que você está avançando conforme planejado.',
    },
    {
      question: 'Há algum desconto ou promoção disponível?',
      answer: 'Sim, oferecemos descontos para pacotes de aulas e promoções especiais em determinadas épocas do ano. Entre em contato para saber sobre as ofertas atuais.',
    },
    {
      question: 'Quanto custa o material didático?',
      answer: 'O material didático é digital, totalmente personalizado e incluído no valor do curso. Não há custo adicional para os materiais.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^\d{10,15}$/; // Exemplo: aceita números com 10 a 15 dígitos
    return regex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!validateEmail(email)) {
      toast.error('Por favor, insira um e-mail válido.'); // Notificação de e-mail inválido
      return;
    }

    if (!validatePhone(phone)) {
      toast.error('Por favor, insira um número de telefone válido (10-15 dígitos).'); // Notificação de telefone inválido
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'schedules'), {
        name,
        email,
        phone,
        createdAt: new Date(),
      });
      toast.success('Agendamento realizado com sucesso!'); // Notificação de sucesso
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Erro ao agendar:', error);
      toast.error('Erro ao agendar. Tente novamente mais tarde.'); // Notificação de erro
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Toaster /> {/* Adicione o Toaster aqui */}
      <div className="w-full sm:gap-36 gap-4 flex sm:flex-row flex-col items-center justify-between p-12 py-20 px-20 mt-20 bg-blue-900 text-white">
        <div className="flex flex-col items-start">
          <p className="sm:text-6xl text-4xl font-semibold">
            Agende sua aula <span className="bg-red-600">experimental</span>
          </p>
          <p className="text-md mt-3">
            Pronto para dar o próximo passo? Insira seu contato e receba uma proposta personalizada!
          </p>
        </div>

        <div className="w-full">
          <form className="flex flex-col items-start w-full space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefone"
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

            <button
              type="submit"
              className="text-sm bg-blue-300 hover:bg-blue-400 text-blue-900 font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Agendando...' : 'AGENDAR AGORA'}
            </button>
          </form>
        </div>
      </div>

      <div className="text-[#505050] flex flex-col items-center p-10">
        <div className="flex flex-col items-start">
          <p className="text-5xl font-semibold text-center">
            Perguntas <span className="text-gradient">frequentes</span>
          </p>
        </div>

        <div className="w-full mt-10 px-12 space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b-2 border-gray-200 pb-4">
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
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10 w-screen h-full">
          <InstagramEmbed url="https://www.instagram.com/englishvipcourse" width={"70%"} height={"100%"}/>
      </div>

    </div>
  );
}
