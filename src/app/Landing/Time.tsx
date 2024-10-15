import Image from "next/image";
import { useState, useEffect } from "react";
import { db, storage } from '../firebaseConfig'; // Adjust according to your Firebase setup
import { doc, setDoc, getDocs, collection, addDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from 'react-hot-toast';
import Upload from '../../../images/rb_7025.png';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export default function Time() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null);
  const [isAddingNewMember, setIsAddingNewMember] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    description: "",
    image: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const querySnapshot = await getDocs(collection(db, "team"));
      const members: TeamMember[] = [];
      querySnapshot.forEach(doc => {
        members.push({ id: doc.id, ...doc.data() } as TeamMember);
      });
      setTeamMembers(members);
    };

    fetchTeamMembers();
  }, []);

  const handleEditMember = (member: TeamMember) => {
    setCurrentTeamMember(member);
    setIsModalOpen(true);
    setIsAddingNewMember(false);
  };

  const handleSaveMember = async () => {
    if (currentTeamMember) {
      const { name, role, description, id } = currentTeamMember;

      try {
        let imageUrl = currentTeamMember.image;

        // Upload new image if selected
        if (imageFile) {
          const imageRef = ref(storage, `team/${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          imageUrl = await getDownloadURL(imageRef);
        }

        const memberRef = doc(db, "team", id);
        await setDoc(memberRef, { name, role, description, image: imageUrl }, { merge: true });

        toast.success("Membro adicionado!");
        setIsModalOpen(false);
      } catch (error) {
        toast.error("Erro ao atualizar");
        console.error("Error saving member:", error);
      }
    }
  };

  const handleAddNewMember = async () => {
    try {
      let imageUrl = "";

      // Upload image if selected
      if (imageFile) {
        const imageRef = ref(storage, `team/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Add new member to Firestore
      const newDocRef = await addDoc(collection(db, "team"), {
        name: newMember.name,
        role: newMember.role,
        description: newMember.description,
        image: imageUrl || "default-image-url.jpg", // Add default image URL if no image is uploaded
      });

      toast.success("New team member added!");
      setIsModalOpen(false);
      setNewMember({ name: "", role: "", description: "", image: "" });
      setImageFile(null);

      // Fetch and update team members list
      const querySnapshot = await getDocs(collection(db, "team"));
      const members: TeamMember[] = [];
      querySnapshot.forEach(doc => {
        members.push({ id: doc.id, ...doc.data() } as TeamMember);
      });
      setTeamMembers(members);
    } catch (error) {
      toast.error("Erro ao adicionar");
      console.error("Error adding new member:", error);
    }
  };

  const handleDeleteMember = async (id: string) => {
    try {
      const memberRef = doc(db, "team", id);
      await deleteDoc(memberRef);

      toast.success("Membro deletado!");
      
      // Remove the deleted member from the state
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    } catch (error) {
      toast.error("Erro ao deletar");
      console.error("Error deleting member:", error);
    }
  }
  
  return (
    <div id="nosso-time" className="bg-blue-50 text-[#505050] flex flex-col items-center h-full pt-8">
      <Toaster />
      <div className="flex flex-col items-center font-bold sm:text-6xl text-4xl w-full sm:p-12 p-4 sm:mt-0 mt-8">
        <span>Conheça</span>
        <span className="text-gradient leading-normal">Nosso Time</span>
      </div>

      <div className="w-screen flex flex-wrap justify-center sm:gap-24 gap-8">
        {teamMembers.map(member => (
          <div key={member.id} className="w-max flex flex-col items-center justify-between gap-2">
            <Image
              src={member.image}
              alt={member.name}
              className="h-80 w-72 object-cover rounded-2xl"
              width={1000}
              height={1000}
              priority
            />
            <span className="w-72 text-center">{member.description}</span>
            <div className="flex flex-col items-center gap-0 mt-4">
              <p className="text-blue-700 font-semibold">{member.name}</p>
              <p className="-mt-2">{member.role}</p>
            </div>

            {isLoggedIn &&
            <div className="flex flex-row gap-2 items-center">
            <button
              onClick={() => handleEditMember(member)}
              className="mt-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-1 px-4 rounded-lg duration-300 transition-all ease-in-out"
            >
              Editar
            </button>
            <button
              onClick={() => handleDeleteMember(member.id)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded-lg duration-300 transition-all ease-in-out"
            >
              Deletar
            </button>
            </div>}

          </div>
        ))}
      </div>

      {/* Add New Member Button */}
      {isLoggedIn &&
      <button
        onClick={() => {
          setIsModalOpen(true);
          setIsAddingNewMember(true);
        }}
        className="mt-8 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg mb-6 duration-300 transition-all ease-in-out"
      >
        Adicionar Novo Membro
      </button>}

      {/* Edit or Add New Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-8 rounded-lg w-full m-4">
            <h3 className="font-bold text-lg mb-4">{isAddingNewMember ? "Adicionar Novo Membro" : "Editar Membro do Time"}</h3>
            <input
              type="text"
              placeholder="Nome"
              value={isAddingNewMember ? newMember.name : currentTeamMember?.name || ""}
              onChange={(e) => isAddingNewMember ? setNewMember({ ...newMember, name: e.target.value }) : setCurrentTeamMember({ ...currentTeamMember!, name: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <input
              type="text"
              placeholder="Cargo"
              value={isAddingNewMember ? newMember.role : currentTeamMember?.role || ""}
              onChange={(e) => isAddingNewMember ? setNewMember({ ...newMember, role: e.target.value }) : setCurrentTeamMember({ ...currentTeamMember!, role: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
            />
            <textarea
              placeholder="Descrição"
              value={isAddingNewMember ? newMember.description : currentTeamMember?.description || ""}
              onChange={(e) => isAddingNewMember ? setNewMember({ ...newMember, description: e.target.value }) : setCurrentTeamMember({ ...currentTeamMember!, description: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-600"
            />

            <div className="grid grid-cols-1 space-y-2 mb-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Adicionar Foto</label>
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
                    onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-row items-center w-full justify-end gap-2">
                <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg ml-2 duration-300 transition-all ease-in-out"
                >
                Cancelar
                </button>
                <button
                onClick={isAddingNewMember ? handleAddNewMember : handleSaveMember}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg duration-300 transition-all ease-in-out"
                >
                {isAddingNewMember ? "Adicionar" : "Salvar Alterações"}
                </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
