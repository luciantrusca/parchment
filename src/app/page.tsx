'use client';
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
  // 1) Validate file (e.g. name.endsWith('.epub'), size limit)
    if (!file.name?.endsWith('.epub')) {
      alert('Please upload a valid EPUB file.');
      return;
    }
  // 3) Prepare upload: const form = new FormData(); form.append('file', file);
  
  // 4) Send to server: await fetch('/api/upload', { method: 'POST', body: form })
  //    - use AbortController if you want cancel support
  //    - use XHR if you need upload progress events
  // 5) Handle response:
  //    - if { downloadUrl } -> set result and show download link
  //    - if { jobId } -> poll /api/job/:id or use SSE/websocket for progress
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
        
      </main>
    </div>
  );
}
