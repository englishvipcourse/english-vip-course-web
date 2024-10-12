import Image from "next/image";
import { useState, useEffect } from "react";
import { auth, db, storage } from '../firebaseConfig'; // Ensure you have storage exported from firebaseConfig
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast, {Toaster} from 'react-hot-toast';
 
export default function Metodo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [newCard, setNewCard] = useState({
    src: '',
    title: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
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
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `icons/${imageFile.name}`);
      try {
        // Upload file
        await uploadBytes(imageRef, imageFile);
        // Get the download URL
        const imageURL = await getDownloadURL(imageRef);

        // Save the new card in Firestore with the image URL
        const newCardRef = doc(collection(db, "metodo"));
        await setDoc(newCardRef, {
          title: newCard.title,
          description: newCard.description,
          src: imageURL // Use the URL from Firebase Storage
        });

        // Clear input fields
        setNewCard({ src: '', title: '', description: '' });
        setImageFile(null);

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

      {/* Admin Card Creation Form */}
      {isLoggedIn && (
        <div className="flex flex-col items-center p-8 bg-gray-200 w-fit h-fit rounded-lg">
          <h3 className="font-bold text-lg mb-4">Create New Card</h3>
          <input
            type="text"
            placeholder="Title"
            value={newCard.title}
            onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Description"
            value={newCard.description}
            onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="mb-2 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleCreateCard}
            className="mt-2 bg-blue-500 hover:bg-blue-700 duration-300 ease-in-out transition-all text-white font-semibold py-2 px-4 rounded-lg"
          >
            Create Card
          </button>
        </div>
      )}

      {/* Cards Container */}
      <div className="flex flex-wrap items-start justify-center gap-8 p-8">
        {cards.map((card) => (
          <div key={card.id} className="flex flex-col items-center w-64 rounded-lg p-4 text-center">
            <Image src={card.src} alt="Imagem" className="mb-4" width={64} height={64} />
            {isLoggedIn ? (
              <input
                type="text"
                value={card.title}
                onChange={(e) => handleTitleChange(card.id, e.target.value)}
                className="font-bold text-sky-500 mb-2"
              />
            ) : (
              <span className="font-bold text-sky-500">{card.title}</span>
            )}
            {isLoggedIn ? (
              <textarea
                value={card.description}
                onChange={(e) => handleDescriptionChange(card.id, e.target.value)}
                className="text-gray-600 mb-2 p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <span className="text-gray-600">{card.description}</span>
            )}
            {isLoggedIn && (
                <div className="flex space-x-2">
                <button
                  onClick={() => handleSaveCard(card.id, card.title, card.description)}
                  className="mt-2 bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded-lg"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
