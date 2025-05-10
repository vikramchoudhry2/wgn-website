const https = require('https');
const fs = require('fs');
const path = require('path');

const fonts = [
  {
    url: 'https://fonts.cdnfonts.com/s/14811/Roxboroughcf-Regular.woff2',
    filename: 'Roxboroughcf-Regular.woff2'
  },
  {
    url: 'https://fonts.cdnfonts.com/s/14811/Roxboroughcf-Regular.woff',
    filename: 'Roxboroughcf-Regular.woff'
  }
];

const downloadFont = (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(__dirname, '../public/fonts', filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename);
      reject(err);
    });
  });
};

const downloadAllFonts = async () => {
  try {
    for (const font of fonts) {
      await downloadFont(font.url, font.filename);
    }
    console.log('All fonts downloaded successfully!');
  } catch (error) {
    console.error('Error downloading fonts:', error);
  }
};

downloadAllFonts(); 