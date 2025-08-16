'use client';
import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [bookText, setBookText] = useState<string | null>(null);
  const textLimit = 1000;

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
    const response = await fetch('/upload', {
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

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Parchment</h1>
        <p className="text-lg">AI powered EPUB translation tool.</p>

        <div className="flex items-center gap-4">
          <label className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
            Upload EPUB
            <input
              type="file"
              accept=".epub,application/epub+zip"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {fileName && <span className="text-sm text-gray-600">{fileName}</span>}
        </div>
        <div className="flex flex-row gap-2">
          <div>
            <span>Before:</span>
            <div className="bg-amber-100 text-black p-2">{bookText?.substring(0,textLimit)}</div>
          </div>
          <div>
            <span>Translated:</span>
            <div className="bg-amber-100 text-black p-2">{bookText?.substring(0,textLimit)}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
