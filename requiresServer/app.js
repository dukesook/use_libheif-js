// Import libheif-js
import libheif from 'https://cdn.jsdelivr.net/npm/libheif-js@1.17.1/libheif-wasm/libheif-bundle.mjs';

// Initialize libheif-js
const libheifInstance = libheif();

// Function to handle file input change
document.getElementById('heifFileInput').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Read the file as an ArrayBuffer
  const fileBuffer = await file.arrayBuffer();

  // Decode the HEIF file
  const decoder = new libheifInstance.HeifDecoder();
  const data = decoder.decode(fileBuffer);
  const image = data[0];
  const width = image.get_width();
  const height = image.get_height();

  // Display the image on the canvas
  const canvas = document.getElementById('heifCanvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  const imageData = context.createImageData(width, height);

  await new Promise((resolve, reject) => {
    image.display(imageData, (displayData) => {
      if (!displayData) {
        return reject(new Error('HEIF processing error'));
      }
      resolve();
    });
  });

  context.putImageData(imageData, 0, 0);
});

//python -m http.server
//http://localhost:8000/
