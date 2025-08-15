import extract from "../extract"
import path from 'path';
import os from 'os';
import { pathToFileURL } from "url";
import { writeFile } from "fs/promises";


export async function POST(request: Request) {
    // 
    if (!request.body || request.headers.get('Content-Type') !== 'application/epub+zip') {
        return new Response('No file uploaded', { status: 400 }); //400 Bad Request
    }
    else {
        // Read the file from the request body
        const arrayBuffer = await request.arrayBuffer();
        const filePath = path.join(os.tmpdir(), `upload-${Date.now()}.epub`);
        const tmpPath = pathToFileURL(filePath);

        // Write the file to a temporary location
        try {
            await writeFile(filePath, Buffer.from(arrayBuffer));
        } catch (error) {
            console.error('Error writing file:', error);
            return new Response('Error processing file', { status: 500 });
        }

        // Extract the EPUB file
        return extract(tmpPath).then((processedText) => {
            return new Response(processedText, { status: 200 });
        }).catch((error) => {
            console.error('Error extracting EPUB:', error);
            return new Response('Error processing file', { status: 500 });
        });
    }
}