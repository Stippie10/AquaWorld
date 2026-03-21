const fs = require('fs');
const sharp = require('sharp');

const input = 'public/AquaWorld_Transparant.svg';
const sizes = [512, 256, 128];

(async () => {
  try {
    const svg = fs.readFileSync(input);
    for (const s of sizes) {
      await sharp(svg)
        .resize(s, s, {fit: 'contain', background: {r:0,g:0,b:0,alpha:0}})
        .png({compressionLevel:9})
        .toFile(`public/AquaWorld_Transparant_${s}.png`);

      await sharp(svg)
        .resize(s, s, {fit: 'contain', background: {r:0,g:0,b:0,alpha:0}})
        .webp({quality:90})
        .toFile(`public/AquaWorld_Transparant_${s}.webp`);

      console.log(`Wrote ${s}px PNG + WebP`);
    }
    console.log('Konversie voltooid.');
  } catch (err) {
    console.error('Fout bij converteren:', err);
    process.exit(1);
  }
})();
