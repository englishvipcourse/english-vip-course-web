import Image from "next/image";
import { useState, useEffect } from "react";
import { db, storage } from '../firebaseConfig'; // Firebase imports
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import Upload from '../../../images/rb_7025.png';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig';

export default function ComoFunciona() {
  const [steps, setSteps] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<any | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Fetch existing steps from Firebase
  useEffect(() => {
    const fetchSteps = async () => {
      const querySnapshot = await getDocs(collection(db, "comoFunciona"));
      const stepsData: any[] = [];
      querySnapshot.forEach((doc) => {
        stepsData.push({ id: doc.id, ...doc.data() });
      });
      setSteps(stepsData);
    };

    fetchSteps();
  }, []);

  const handleEdit = (step: any) => {
    setEditingStep(step);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (editingStep) {
      try {
        let imageURL = editingStep.image;

        // If a new image is uploaded, upload it to Firebase Storage
        if (newImageFile) {
          const imageRef = ref(storage, `funciona/${newImageFile.name}`);
          await uploadBytes(imageRef, newImageFile);
          imageURL = await getDownloadURL(imageRef);
        }

        // Save the step data in Firestore
        const stepRef = doc(db, "comoFunciona", editingStep.id);
        await setDoc(stepRef, {
          number: editingStep.number,
          title: editingStep.title,
          subtitle: editingStep.subtitle,
          image: imageURL,
          description: editingStep.description
        }, { merge: true });

        // Update the local state
        const updatedSteps = steps.map((step) =>
          step.id === editingStep.id ? { ...editingStep, image: imageURL } : step
        );
        setSteps(updatedSteps);
        setEditingStep(null);
        setNewImageFile(null);
        setIsModalOpen(false);
        toast.success("Card adicionado com sucesso!");
      } catch (error) {
        console.error("Error saving step:", error);
        toast.error("Erro ao salvar.");
      }
    }
  };

  const handleAddNewStep = () => {
    setEditingStep({
      id: doc(collection(db, "comoFunciona")).id, // Create a new ID for the step
      number: (steps.length + 1).toString(),
      title: "",
      subtitle: "",
      image: null,
      description: ""
    });
    setIsModalOpen(true);
  };

  const handleSaveNewStep = async () => {
    if (editingStep) {
      try {
        let imageURL = "";

        // Upload image to Firebase Storage if a new image is selected
        if (newImageFile) {
          const imageRef = ref(storage, `funciona/${newImageFile.name}`);
          await uploadBytes(imageRef, newImageFile);
          imageURL = await getDownloadURL(imageRef);
        }

        // Save the new step in Firestore
        const stepRef = doc(db, "comoFunciona", editingStep.id);
        await setDoc(stepRef, {
          number: editingStep.number,
          title: editingStep.title,
          subtitle: editingStep.subtitle,
          image: imageURL,
          description: editingStep.description
        });

        // Update local state with the new step
        setSteps([...steps, { ...editingStep, image: imageURL }]);
        setEditingStep(null);
        setNewImageFile(null);
        setIsModalOpen(false);
        toast.success("New step added successfully!");
      } catch (error) {
        console.error("Error adding step:", error);
        toast.error("Erro ao adicionar card.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "comoFunciona", id));
      setSteps(steps.filter((step) => step.id !== id));
      toast.success("Step deleted successfully!");
    } catch (error) {
      console.error("Error deleting step:", error);
      toast.error("Erro ao deletar card.");
    }
  };

  return (
    <div id="quem-somos" className="bg-blue-50 text-[#505050] flex flex-col items-center h-full">
      <Toaster />
      <div className="flex flex-col items-center font-bold sm:text-6xl text-4xl w-full p-14">
        <span>Como funciona</span>
        <span className="text-gradient leading-normal">a English Vip Course</span>
      </div>

      <div className="w-full flex flex-wrap justify-around p-2 gap-2">
        {steps.map((step) => (
          <div key={step.id} className="sm:w-[25%] w-full h-[50%] flex flex-col items-start gap-2">
            <p className="text-5xl font-bold text-gradient">{step.number}</p>
            <p className="text-2xl font-bold">{step.title}</p>
            <p className="-mt-2 text-2xl font-bold text-gradient">{step.subtitle}</p>
            {step.image && (
              <Image src={step.image} alt="" className="h-full w-full rounded-3xl" width={300} height={200} />
            )}
            <span className="text-justify mt-3">{step.description}</span>
            {isLoggedIn &&
            <div className="flex space-x-2">
              <button
                className="mt-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
                onClick={() => handleEdit(step)}
              >
                Editar
              </button>
              <button
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
                onClick={() => handleDelete(step.id)}
              >
                Deletar
              </button>
            </div>}
          </div>
        ))}
      </div>

      {isLoggedIn &&
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-lg duration-300 transition-all ease-in-out font-semibold"
          onClick={handleAddNewStep}
        >
          Adicionar Card Novo
        </button>
      </div>}

      {/* Modal for Editing or Adding a New Step */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg m-4">
            <h3 className="font-bold text-lg mb-4">{editingStep?.id ? "Editar Card" : "Adicionar Card Novo"}</h3>
            <input
              type="text"
              placeholder="Número"
              value={editingStep?.number || ""}
              onChange={(e) => setEditingStep({ ...editingStep, number: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <input
              type="text"
              placeholder="Título"
              value={editingStep?.title || ""}
              onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <input
              type="text"
              placeholder="Subtítulo"
              value={editingStep?.subtitle || ""}
              onChange={(e) => setEditingStep({ ...editingStep, subtitle: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <textarea
              placeholder="Descrição"
              value={editingStep?.description || ""}
              onChange={(e) => setEditingStep({ ...editingStep, description: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Adicionar Imagem</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-26 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-row items-center justify-center">
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
                    onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-3">
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
                >
                    Cancelar
                </button>
              {editingStep?.id ? (
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
                >
                  Salvar
                </button>
              ) : (
                <button
                onClick={handleSaveNewStep}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
              >
                Salvar Próximo
              </button>
          )}
        </div>
      </div>
    </div>
  )}
</div>
);
}
