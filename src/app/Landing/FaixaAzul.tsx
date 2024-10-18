import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export default function FaixaAzul() {
  const db = getFirestore(); // Initialize Firestore
  const [leftText, setLeftText] = useState<string>(''); // Set default or empty string
  const [highlightText, setHighlightText] = useState<string>(''); // Set default or empty string
  const [buttonText, setButtonText] = useState<string>(''); // Set default or empty string
  const [buttonLink, setButtonLink] = useState<string>(''); // Set default or empty string
  const [highlightStart, setHighlightStart] = useState<number>(0);
  const [highlightEnd, setHighlightEnd] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set the login status
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Fetch content from Firestore
  useEffect(() => {
    const fetchContent = async () => {
      const docRef = doc(db, "content", "content_data"); // Assuming the document ID is "content_data"
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLeftText(data.leftText);
        setHighlightText(data.highlightText);
        setButtonText(data.buttonText);
        setButtonLink(data.buttonLink);
      }
    };
    fetchContent();
  }, []);

  // Recalculate highlight positions when text or highlightText changes
  useEffect(() => {
    if (highlightText && leftText) {
      const start = leftText.indexOf(highlightText);
      const end = start + highlightText.length;
      setHighlightStart(start);
      setHighlightEnd(end);
    }
  }, [highlightText, leftText]);

  // Handle button text change
  const handleButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonText(e.target.value);
  };

  // Handle highlight change
  const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHighlightText(value);
  };

  // Function to render left text with a background highlight
  const getHighlightedText = () => {
    if (!highlightText || highlightStart === -1 || highlightEnd === -1) {
      return <span>{leftText}</span>;
    }
    return (
      <span>
        {leftText.substring(0, highlightStart)}
        <span className="bg-red-600 leading-normal">{leftText.substring(highlightStart, highlightEnd)}</span>
        {leftText.substring(highlightEnd)}
      </span>
    );
  };

  // Save the changes to Firestore
  const saveChangesToFirestore = async () => {
    const docRef = doc(db, "content", "content_data");
    await setDoc(docRef, {
      leftText,
      highlightText,
      buttonText,
      buttonLink
    });
  };

  return (
    <div id='background-logo' className="w-full bg-blue-900 py-6 flex flex-col items-center my-4">
      <div className="flex sm:flex-row flex-col items-center justify-around w-screen py-16 sm:px-36 px-16 gap-4">
        <div className="text-xl md:text-2xl font-semibold sm:text-left text-center">
            {getHighlightedText()}
        </div>
        
        <a href={buttonLink}>
          <button className="sm:mt-0 mt-6 sm:px-16 px-8 py-2 text-sm bg-white text-blue-900 font-semibold rounded-full hover:bg-gray-200 duration-300 ease-in-out transition-all">
            {buttonText}
          </button>
        </a>
      </div>

      {/* Conditionally render the "Edit" section only if logged in */}
      {isLoggedIn && (
        <div className="mt-6">
          {isEditing ? (
            <div className="flex flex-col items-center">
              {/* Editable left text */}
              <textarea
                className="text-center text-white font-semibold mb-2 bg-transparent border-b-2 border-white focus:outline-none"
                value={leftText}
                onChange={(e) => setLeftText(e.target.value)}
              />
              {/* Editable highlight input */}
              <input
                type="text"
                className="text-center text-red-500 font-semibold bg-transparent border-b-2 border-white focus:outline-none mb-2"
                placeholder="Enter text to highlight"
                value={highlightText}
                onChange={handleHighlightChange}
              />
              {/* Editable button text */}
              <input
                type="text"
                className="text-center text-red-500 font-semibold bg-transparent border-b-2 border-white focus:outline-none mb-2"
                placeholder="Edit button text"
                value={buttonText}
                onChange={handleButtonTextChange}
              />
              {/* Save Button */}
              <button
                onClick={saveChangesToFirestore}
                className="my-4 bg-green-500 hover:bg-green-600 text-white duration-300 ease-in-out transition-all py-2 px-4 rounded-lg mt-4"
                >
                Salvar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="my-4 bg-green-500 hover:bg-green-600 text-white duration-300 ease-in-out transition-all py-2 px-4 rounded-lg mt-4"
            >
              Editar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
