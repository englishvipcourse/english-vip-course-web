import Image from "next/image";
import { useState, useEffect } from "react";
import { auth, db, storage } from '../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from 'react-hot-toast';
import Upload from '../../../images/rb_7025.png';

export default function Metodo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [newCard, setNewCard] = useState({
    src: '',
    title: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Retrieve cards from Firebase on mount
    const fetchCards = async () => {
      const querySnapshot = await getDocs(collection(db, "metodo"));
      const cardsData: any[] = [];
      querySnapshot.forEach((doc) => {
        cardsData.push({ id: doc.id, ...doc.data() });
      });
      setCards(cardsData);
    };

    fetchCards();
  }, []);

  const handleTitleChange = (id: string, newTitle: string) => {
    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, title: newTitle } : card
    );
    setCards(updatedCards);
  };

  const handleDescriptionChange = (id: string, newDescription: string) => {
    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, description: newDescription } : card
    );
    setCards(updatedCards);
  };

  const handleSaveCard = async (id: string, title: string, description: string) => {
    try {
      const cardRef = doc(db, "metodo", id);
      await setDoc(cardRef, { title, description }, { merge: true });
      toast.success("Card updated in Firebase");
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const cardRef = doc(db, "metodo", id);
      await deleteDoc(cardRef);
      toast.error("Card deleted");
      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleCreateCard = async () => {
    if (imageFile) {
      const imageRef = ref(storage, `icons/${imageFile.name}`);
      try {
        // Upload file
        await uploadBytes(imageRef, imageFile);
        const imageURL = await getDownloadURL(imageRef);

        // Save the new card in Firestore with the image URL
        const newCardRef = doc(collection(db, "metodo"));
        await setDoc(newCardRef, {
          title: newCard.title,
          description: newCard.description,
          src: imageURL
        });

        setNewCard({ src: '', title: '', description: '' });
        setImageFile(null);
        setIsModalOpen(false); // Close the modal after creating the card

        // Fetch updated cards
        const querySnapshot = await getDocs(collection(db, "metodo"));
        const cardsData: any[] = [];
        querySnapshot.forEach((doc) => {
          cardsData.push({ id: doc.id, ...doc.data() });
        });
        setCards(cardsData);
        toast.success("New card created and saved in Firebase");
      } catch (error) {
        console.error("Error uploading image or saving card:", error);
      }
    } else {
      toast.error("Please upload an image before creating the card.");
    }
  };

  return (
    <div id="nosso-metodo" className="text-[#505050] sm:p-4 flex flex-col justify-center items-center">
      <Toaster />
      <div className="lg:flex lg:flex-row sm:flex sm:flex-col items-center sm:p-20 sm:px-38 p-6 px-6 w-full h-full">
        <div className="flex flex-col sm:items-start items-center font-bold sm:text-6xl text-4xl w-full">
          <span>Personalizado,</span>
          <span className="text-gradient">flexível e eficaz</span>
        </div>
        <div className="sm:text-right text-center leading-8">
          <span className="text-black">
            Descubra o Diferencial da Nossa Escola: domine o inglês de forma rápida, eficiente e abra portas para oportunidades globais.
          </span>
        </div>
      </div>

      {isLoggedIn && (
        <div className="flex flex-col items-center p-2">
          <button
            onClick={() => setIsModalOpen(true)} // Open modal
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
          >
            Adicionar card novo
          </button>
        </div>
      )}

      {/* Modal for Creating New Card */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg">
            <h3 className="font-bold text-lg mb-4">Criar um novo card</h3>
            <input
              type="text"
              placeholder="Título"
              value={newCard.title}
              onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <textarea
              placeholder="Descrição"
              value={newCard.description}
              onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <div className="grid grid-cols-1 space-y-2 mb-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Adicionar Ícone</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <Image
                        src={Upload}
                        alt="Upload Image"
                        width={500}
                        height={500}
                      />
                    </div>
                    <p className="pointer-none text-gray-500">
                      <a href="#" className="text-blue-600 hover:underline duration-300 transition-all ease-in-out">Selecione um arquivo</a> do seu computador
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateCard}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards Container */}
      <div className="flex flex-wrap items-start justify-center gap-8 p-6">
        {cards.map((card) => (
          <div key={card.id} className="flex flex-col items-center w-64 rounded-lg p-4 text-center">
            <Image src={card.src} alt="Imagem" className="mb-4" width={64} height={64} />
            {isLoggedIn ? (
              <input
                type="text"
                value={card.title}
                onChange={(e) => handleTitleChange(card.id, e.target.value)}
                className="p-2 border border-gray-300 rounded-md font-bold text-sky-500 mb-2 focus:outline-none focus:ring-2 focus:border-blue-600"
              />
            ) : (
              <span className="font-bold text-sky-500">{card.title}</span>
            )}
            {isLoggedIn ? (
              <textarea
                value={card.description}
                onChange={(e) => handleDescriptionChange(card.id, e.target.value)}
                className="text-gray-600 mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
              />
            ) : (
              <span className="text-gray-600">{card.description}</span>
            )}
            {isLoggedIn && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(card.id)}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded-lg duration-300 transition-all ease-in-out" 
                >
                  Deletar
                </button>
                <button
                  onClick={() => handleSaveCard(card.id, card.title, card.description)}
                  className="mt-2 bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded-lg duration-300 transition-all ease-in-out"
                >
                  Salvar
                </button>
              
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
