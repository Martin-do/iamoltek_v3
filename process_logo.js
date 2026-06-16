import fs from 'fs';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

console.log('Reading logo-original.jpg...');
const jpegData = fs.readFileSync('src/assets/logo-original.jpg');
const rawImageData = jpeg.decode(jpegData, { useTArray: true });

const width = rawImageData.width;
const height = rawImageData.height;

console.log(`Image decoded: ${width}x${height}`);

const png = new PNG({ width, height });

for (let i = 0; i < rawImageData.data.length; i += 4) {
  const r = rawImageData.data[i];
  const g = rawImageData.data[i + 1];
  const b = rawImageData.data[i + 2];
  
  // Since it is a white logo on a black background, the brightness of the pixel 
  // directly translates to how opaque the white should be!
  // This guarantees absolutely perfect anti-aliasing with no distorted edges.
  const brightness = Math.max(r, g, b);
  
  // Set the output pixel to pure white
  png.data[i] = 255;     // R
  png.data[i + 1] = 255; // G
  png.data[i + 2] = 255; // B
  
  // Set alpha based on original brightness
  png.data[i + 3] = brightness;
}

console.log('Writing to logo-white.png...');
png.pack().pipe(fs.createWriteStream('src/assets/logo-white.png'))
  .on('finish', () => {
    console.log('Successfully created perfectly transparent logo-white.png with zero distortion!');
  });
