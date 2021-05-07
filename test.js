const fs = require('fs');
const fetch = require('node-fetch');
const request = require('request');

// const htmlText = fetch('https://memegen-link-examples-upleveled.netlify.app/')
//   .then((res) => res.text())
//   .then((body) => console.log(body));

// console.log(htmlText);

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
saveFile(
  "https://api.memegen.link/images/happening/_/it's_happening.jpg?width=300",
  './memes/meme.jpg',
);
