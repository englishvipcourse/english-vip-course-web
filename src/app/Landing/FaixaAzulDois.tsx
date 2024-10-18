import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export default function FaixaAzulDois() {
  const db = getFirestore(); // Initialize Firestore
  const [leftText, setLeftText] = useState<string>(''); // Set default or empty string
  const [highlightText, setHighlightText] = useState<string>(''); // Set default or empty string
  const [secondText, setSecondText] = useState<string>(''); // New state for second text
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
      const docRef = doc(db, "contents", "content_datas"); // Assuming the document ID is "content_datas"
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLeftText(data.leftText);
        setHighlightText(data.highlightText);
        setSecondText(data.secondText || ''); // Set secondText from Firestore
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

  // Handle highlight change
  const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHighlightText(value);
  };

  // Handle second text change
  const handleSecondTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSecondText(value);
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

  return (
    <div id='background-logo' className="w-full bg-blue-900 my-4">

      <div className="w-screen h-full sm:gap-2 gap-10 flex sm:flex-row flex-col items-start justify-between sm:py-28 py-16 px-20 mt-10">
        <div className="text-xl md:text-3xl font-semibold sm:text-left text-center">
            <p className=''>{getHighlightedText()}</p>
        </div>
        <span className='leading-loose text-sm md:text-base sm:text-right text-center sm:px-20 p-0'>{secondText}</span>
      </div>

      {/* Conditionally render the "Edit" section only if logged in */}
      {isLoggedIn && (
        <div className="mt-6">
          {isEditing ? (
            <div className="flex flex-col items-center">
              <div className='flex sm:flex-row flex-col items-center gap-3'>
                {/* Editable left text */}
                <textarea
                className="bg-transparent border-2 p-4 border-gray-200 rounded-md w-80 h-80 text-xl md:text-3xl font-semibold sm:leading-[50px] leading-[40px] sm:text-left text-center"
                value={leftText}
                onChange={(e) => setLeftText(e.target.value)}
                />
                {/* Editable highlight input */}
                <input
                type="text"
                className="bg-transparent border-2 p-4 border-gray-200 rounded-md w-80 h-80 text-xl md:text-3xl font-semibold sm:leading-[50px] leading-[40px] sm:text-left text-center"
                placeholder="Enter text to highlight"
                value={highlightText}
                onChange={handleHighlightChange}
                />
                {/* Editable second text */}
                <input
                type="text"
                className="bg-transparent border-2 p-4 border-gray-200 rounded-md w-80 h-80 text-xl md:text-3xl font-semibold sm:leading-[50px] leading-[40px] sm:text-left text-center"
                placeholder="Enter second text"
                value={secondText}
                onChange={handleSecondTextChange}
                />
              </div>
              {/* Save Button */}
              <button
                onClick={async () => {
                  const docRef = doc(db, "contents", "content_datas");
                  await setDoc(docRef, { leftText, highlightText, secondText });
                  setIsEditing(false); // Optionally stop editing after saving
                }}
                className="my-4 bg-green-500 hover:bg-green-600 text-white duration-300 ease-in-out transition-all py-2 px-4 rounded-lg mt-4"
                >
                Salvar
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
            <button
              onClick={() => setIsEditing(true)}
              className="my-4 bg-green-500 hover:bg-green-600 text-white duration-300 ease-in-out transition-all py-2 px-4 rounded-lg mt-4"
              >
              Editar
            </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
