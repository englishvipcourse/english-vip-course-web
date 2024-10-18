import Image from "next/image";
import { useState, useEffect } from "react";
import { auth, db, storage } from '../firebaseConfig'; // Ensure you have storage exported from firebaseConfig
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Upload from '../../../images/rb_7025.png';
import toast, { Toaster } from "react-hot-toast";

export default function Depoimentos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [newTestimonial, setNewTestimonial] = useState({
    image: '',
    name: '',
    description: '',
    profession: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Check if the viewport is mobile
  const checkViewport = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Fetch testimonials from Firestore on mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      const querySnapshot = await getDocs(collection(db, "depoimentos"));
      const testimonialsData: any[] = [];
      querySnapshot.forEach((doc) => {
        testimonialsData.push({ id: doc.id, ...doc.data() });
      });
      setTestimonials(testimonialsData);
    };

    fetchTestimonials();

    // Check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Determine how many testimonials to display
  const testimonialsToShow = isMobile ? 1 : 3;

  // Handle testimonial updates
  const handleTestimonialChange = (id: string, field: string, value: string) => {
    const updatedTestimonials = testimonials.map((testimonial) =>
      testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
    );
    setTestimonials(updatedTestimonials);
  };

  // Save edited testimonial to Firestore
  const handleSaveTestimonial = async (id: string, name: string, description: string, image: string, profession: string) => {
    try {
      const testimonialRef = doc(db, "depoimentos", id);
      await setDoc(testimonialRef, { name, description, image, profession }, { merge: true });
      toast.success("Depoimento salvo!");
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  // Delete testimonial from Firestore
  const handleDeleteTestimonial = async (id: string) => {
    try {
      const testimonialRef = doc(db, "depoimentos", id);
      await deleteDoc(testimonialRef);
      toast.success("Depoimento deletado!");
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  // Handle new testimonial creation
  const handleCreateTestimonial = async () => {
    if (imageFile) {
      const imageRef = ref(storage, `depoimentos/${imageFile.name}`);
      try {
        // Upload file
        await uploadBytes(imageRef, imageFile);
        // Get the download URL
        const imageURL = await getDownloadURL(imageRef);

        // Save new testimonial to Firestore
        const newTestimonialRef = doc(collection(db, "depoimentos"));
        await setDoc(newTestimonialRef, {
          name: newTestimonial.name,
          description: newTestimonial.description,
          image: imageURL // Save image URL
        });

        // Clear form
        setNewTestimonial({ image: '', name: '', description: '', profession: '' });
        setImageFile(null);

        // Fetch updated testimonials
        const querySnapshot = await getDocs(collection(db, "depoimentos"));
        const testimonialsData: any[] = [];
        querySnapshot.forEach((doc) => {
          testimonialsData.push({ id: doc.id, ...doc.data() });
        });
        setTestimonials(testimonialsData);

        toast.success("Novo depoimento criado!");
        setIsModalOpen(false); // Close modal after creating testimonial
      } catch (error) {
        toast.error("Erro ao subir imagem");
      }
    } else {
      console.log("Please upload an image before creating the testimonial.");
    }
  };

  return (
    <div id="depoimentos" className="text-[#505050] flex flex-col gap-4 items-center justify-center p-8">
      <Toaster />

      <div className="flex flex-col gap-2 items-center sm:text-5xl text-3xl text-center">
        <p className="font-bold">Transformações <span className="text-gradient">reais</span></p>
        <p className="text-base font-medium">Histórias de Sucesso de Nossos Alunos</p>
      </div>

      <div className="flex flex-col items-center p-8 lg:px-20">
        <div className="flex gap-4 justify-center">
          {testimonials.slice(currentIndex, currentIndex + testimonialsToShow).map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center w-full rounded-lg p-4 text-center">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                className="mb-4 w-36 rounded-full"
                width={144}
                height={144}
              />
              {isLoggedIn ? (
                <>
                  <div className="flex flex-col items-center justify-center gap-2">
                  <textarea
                    value={testimonial.description}
                    onChange={(e) => handleTestimonialChange(testimonial.id, "description", e.target.value)}
                    className="text-gray-600 mb-2 p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => handleTestimonialChange(testimonial.id, "name", e.target.value)}
                    className="font-bold text-sky-500 mb-2"
                  />
                  <input
                    type="text"
                    value={testimonial.profession}
                    onChange={(e) => handleTestimonialChange(testimonial.id, "profession", e.target.value)}
                    className="italic text-gray-500 mb-2"
                    placeholder="Profissão"
                  />
                  </div>
                  <div className="flex space-x-2">
                  <button
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="mt-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded-lg duration-300 transition-all ease-in-out"
                    >
                      Deletar
                    </button>
                    <button
                      onClick={() => handleSaveTestimonial(testimonial.id, testimonial.name, testimonial.description, testimonial.image, testimonial.profession)}
                      className="mt-2 bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded-lg duration-300 transition-all ease-in-out"
                    >
                      Salvar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-gray-600">{testimonial.description}</span>
                  <span className="font-bold text-sky-500">{testimonial.name}</span>
                  <div className="text-gray-500">{testimonial.profession}</div>
                </>
              )}
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

      {isLoggedIn && (
        <div className="flex flex-col items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
          >
            Adicionar depoimento
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg m-4">
            <h3 className="font-bold text-lg mb-4">Adicionar Novo Depoimento</h3>
            <div className="grid grid-cols-1 space-y-2 mb-3">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Adicionar Imagem</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <Image
                        src={Upload}
                        alt="Upload Image"
                        width={144}
                        height={144}
                      />
                    </div>
                    <p className="pointer-none text-gray-500">
                      <a href="#" className="text-blue-600 hover:underline duration-300 transition-all ease-in-out">Selecione um arquivo</a> do seu computador
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e: any) => setImageFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <input
              type="text"
              placeholder="Nome"
              value={newTestimonial.name}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <input
              type="text"
              placeholder="Profissão"
              value={newTestimonial.profession}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, profession: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <textarea
              placeholder="Descrição"
              value={newTestimonial.description}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, description: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateTestimonial}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
              >
                Adicionar Depoimento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
