// Modules
const fetch = require('node-fetch');
const fs = require('fs');
const request = require('request');

// Fetch html as string
fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((res) => res.text())
  .then((body) => {
    const htmlText = body;

    //Match img src
    const regex = /<img src=(.*?)>/g;
    const imgTags = htmlText.match(regex);

    // Loop first 10 url's and create an array
    const firstTen = [];
    for (i = 0; i < 10; i++) {
      firstTen.push(imgTags[i].split('"')[1]);
    }

    // Create directory: memes
    const memes = './memes';

    try {
      if (!fs.existsSync(memes)) {
        fs.mkdirSync(memes);
      }
    } catch (err) {
      console.error(err);
    }

    // Create numbered filenames
    const fileNames = [];
    for (i = 0; i < 10; i++) {
      fileNames.push(`./memes/${i}_meme.jpg`);
    }
    // Function to save images using its url's to files
    const saveFile = function (memeurl, newpath) {
      const download = (url, path, callback) => {
        request.head(url, (err, res, body) => {
          request(url).pipe(fs.createWriteStream(path)).on('close', callback);
        });
      };

      const url = memeurl;
      const path = newpath;

      download(url, path, () => {
        console.log('✅ Done!');
      });
    };
    // Calling function to save images to numbered files
    for (i = 0; i < 10; i++) {
      saveFile(firstTen[i], fileNames[i]);
    }
  });
