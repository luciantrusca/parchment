import {EPub} from 'epub2';
import * as cheerio from 'cheerio';

// const epubURL = 'public/books/Pendragon_The_Merchant_of_Death_DJ_MacHale.epub';

export default async function extract(epubURL: URL): Promise<string> {
    let epub = await EPub.createAsync(epubURL.pathname,  "",  "");

    return new Promise<string>((resolve, reject) => {
        epub.getChapterRaw(epub.flow[5].id, function(err, xml){
            if(err) {
                console.error(err);
                return reject(err);
            }
            try {
                const processed_xml = cheerio.load(xml,{});
                console.log("First chapter content:", processed_xml.text().substring(0, 1000) + "...");

                return resolve(processed_xml.text());
            } catch (error) {
                console.error(error);
                return reject(error);
            }
        });
    });
}