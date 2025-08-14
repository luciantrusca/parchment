import {EPub} from 'epub2';
import * as cheerio from 'cheerio';


const epubURL = 'public/books/Pendragon_The_Merchant_of_Death_DJ_MacHale.epub';
// let epub = new EPub(epubURL, "", "");

async function main(){
    let epub = await EPub.createAsync(epubURL,  "",  "");

    epub.getChapterRaw(epub.flow[4].id, function(err, xml){
    if(err) {
        console.error(err);
        return;
    }
    // console.log("First chapter content:", xml.substring(0, 1000) + "...");
    const processed_xml = cheerio.load(xml,{});
    console.log("processed xml:", processed_xml.text());
    
});

}

main().catch(console.error);
