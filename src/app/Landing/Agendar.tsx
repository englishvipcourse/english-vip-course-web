import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { db } from '../firebaseConfig';

export default function Agendar() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate email format
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate phone format
  const validatePhone = (phone: string) => {
    const regex = /^\d{10,15}$/; // Example: accepts numbers with 10 to 15 digits
    return regex.test(phone);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default submission

    if (!name || !email || !phone) {
      toast.error('Preencha todos os campos!');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Email inválido!');
      return;
    }

    if (!validatePhone(phone)) {
      toast.error('Telefone inválido!');
      return;
    }

    try {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, 'schedules'), {
          name,
          email,
          phone,
          createdAt: new Date(),
        });
        setName('');
        setEmail('');
        setPhone('');
      } catch (error) {
          console.error('Erro ao agendar:', error);
        }

      // Call the backend API
      const response = await fetch('/api/emails/receipts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mail: email, number: phone }),
      });

      if (response.ok) {
        toast.success('Aula agendada com sucesso!');
      } else {
        toast.error('Erro ao agendar! Tente novamente.');
      }
    } catch (error) {
      toast.error('Erro ao enviar dados! Tente novamente.');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div id="contato" >
      <Toaster /> {/* Add Toaster for toast notifications */}
      <div id="background-logo" className="w-full sm:gap-36 gap-4 flex sm:flex-row flex-col items-center justify-between p-12 py-20 px-20 mt-20 bg-blue-900 text-white">
        <div className="flex flex-col items-start">
          <p className="sm:text-6xl text-4xl font-semibold">
            Agende sua aula <span className="bg-red-600 leading-normal">experimental</span>
          </p>
          <p className="text-md mt-3">
            Pronto para dar o próximo passo? Insira seu contato e receba uma proposta personalizada!
          </p>
        </div>

        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col items-start w-full space-y-4">
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
              placeholder="Telefone - 11 922556677"
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
    </div>
  );
}
