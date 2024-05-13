import libheif from 'https://cdn.jsdelivr.net/npm/libheif-js@1.17.1/libheif-wasm/libheif-bundle.mjs';
const { HeifDecoder } = libheif();

// Function to handle file input change
function handleFileInputChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const arrayBuffer = event.target.result;

      const decoder = new HeifDecoder();

      const data = decoder.decode(arrayBuffer);
      const image = data[0];
      const width = image.get_width();
      const height = image.get_height();

      console.log('width:', width);
      console.log('height:', height);
    };

    reader.readAsArrayBuffer(file);
  }
}

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFileInputChange);
