import { HeifFile } from 'libheif-js';

// Function to handle file input change
function handleFileInputChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const arrayBuffer = event.target.result;

      try {
        const heifFile = new HeifFile(arrayBuffer);
        const data = heifFile.get_primary_image();
        const image = data.display();

        const width = image.width;
        const height = image.height;

        console.log('Image width:', width);
        console.log('Image height:', height);
      } catch (e) {
        console.error('Error decoding HEIF image:', e);
      }
    };

    reader.readAsArrayBuffer(file);
  }
}

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFileInputChange);
