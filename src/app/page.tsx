'use client';
import { useState } from "react";
import {BarLoader} from "react-spinners";

export default function Home() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [bookText, setBookText] = useState<string | null>(null);
  const [translatedBookText, setTranslatedBookText] = useState<string | null>(null);
  const [loadingTranslate, setLoadingTranslate] = useState<boolean>(false);
  const textLimit = 1000;
  let [targetLanguage, setTargetLanguage] = useState<string>('romanian');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
  // 1) Validate file (e.g. name.endsWith('.epub')
    if (!file.name?.endsWith('.epub')) {
      alert('Please upload a valid EPUB file.');
      return;
    }
    // 4) Send to server: await fetch('/api/upload', { method: 'POST', body: form })
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: file,
      headers: {
        'Content-Type': 'application/epub+zip',
      }
    });
  // 5) Handle response:
    const result = await response.text();
    response.ok && setBookText(result);

  // 6) On error: set error state and stop loading
  // 7) Cleanup: clear AbortController, reset loading state if needed
    console.log('Selected file:', file);
  }

  async function handleTranslate(){
    if (bookText) {
      setLoadingTranslate(true);
      const res = await fetch ('/api/translate', {
        method: 'POST',
        body: JSON.stringify({ text: bookText, targetLanguage: targetLanguage }),
        headers: {
          'Content-Type': "application/json"
        }
      })

      {/* Check server response is ok & update page */}
      if (res.ok) {
        const { translatedText } = await res.json();
        console.log('Translated text:', translatedText);
        setTranslatedBookText(translatedText);
        setLoadingTranslate(false);
      }
      else {
        setLoadingTranslate(false);
      }
    }
  }

  return (
    <div className="">
      <main className="font-sans m-5 align-middle items-center min-h-screen flex flex-col ">
        <h1 className="text-4xl font-bold">Parchment</h1>
        <p className="text-lg mb-3">AI powered EPUB translation tool.</p>

        {/* Upload & settings */}
        <div className="flex items-center gap-4">
          <label className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
            Upload EPUB
            <input
              type="file"
              accept=".epub,application/epub+zip"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Show translate button  */}
          <button className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer
            ${bookText ? '' : 'hidden'}`}
            onClick={handleTranslate}
          >
            {loadingTranslate ? <BarLoader color="#36d7b7" /> : 'Translate'}
          </button>
          {/* File name display */}
          {fileName && <div className="text-sm text-gray-600">{fileName}</div>}
        </div>

        {/* Text before & after */}
        {bookText && (
          <div className="flex flex-row gap-2 flex-1/2 w-1/2 justify-stretched">
            <div>
              <span>Before:</span>
              <div className="bg-amber-100 text-black p-2">{bookText?.substring(0,textLimit)}</div>
            </div>
            <div>
              <span>Translated:</span>
              <div className="bg-amber-100 text-black p-2">{translatedBookText?.substring(0,textLimit)}</div>
            </div>
          </div>

        )}
      </main>
    </div>
  );
}
