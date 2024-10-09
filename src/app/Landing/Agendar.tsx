import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function Agendar() {
  const faqData: FAQItem[] = [
    {
      question: 'As aulas são em turmas ou individuais?',
      answer: 'Todas as aulas são individuais e personalizadas de acordo com suas necessidades e metas.',
    },
    {
      question: 'Quem será meu professor(a)?',
      answer: 'Todos os nossos professores são altamente qualificados, com experiência específica no ensino de inglês.',
    },
    {
      question: 'Quanto tempo dura o curso?',
      answer: 'A duração do curso depende do seu progresso e objetivos, sendo flexível conforme suas necessidades.',
    },
    {
      question: 'É preciso pagar matrícula?',
      answer: 'Não, não há necessidade de pagar matrícula para começar.',
    },
    {
      question: 'Qual é a metodologia de ensino?',
      answer: 'Utilizamos uma metodologia prática focada na conversação, sempre adaptada ao seu nível de inglês.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div>
      <div className="w-full gap-36 flex flex-row items-center justify-between p-12 py-20 px-20 mt-20 bg-blue-900 text-white">
        <div className="flex flex-col items-start">
          <p className="text-6xl font-semibold">
            Agende sua aula <span className="bg-red-600">experimental</span>
          </p>
          <p className="text-md mt-3">
            Pronto para dar o próximo passo? Insira seu contato e receba uma proposta personalizada!
          </p>
        </div>

        <div className="w-full">
          <form className="flex flex-col items-start w-full space-y-4">
            <input
              type="text"
              placeholder="Nome"
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="tel"
              placeholder="Telefone"
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button
              type="submit"
              className="text-sm bg-blue-300 hover:bg-blue-400 text-blue-900 font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out"
            >
              AGENDAR AGORA
            </button>
          </form>
        </div>
      </div>

      <div className="text-[#505050] flex flex-col items-center p-10">
        <div className="flex flex-col items-start">
          <p className="text-5xl font-semibold">
            Perguntas <span className="text-blue-600">frequentes</span>
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

              {/* Animated answer with smooth transition */}
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
    </div>
  );
}
