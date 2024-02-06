// const libheif = window.libheif()

console.log('libheif:', libheif);

const decoder = new libheif.HeifDecoder() //Error: libheif.HeifDecoder() is not a constructor







document.getElementById('loadFileButton').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();

  // If success
  reader.onload = function (e) {
    let raw = new Uint8Array(e.target.result);
    console.log('File read:', raw);

    // TODO: Decode HEIF
    
  };

  // If error
  reader.onerror = function (error) {
    console.error('Error reading file:', error);
  };

  // Execute!
  console.log('reading file...');
  reader.readAsArrayBuffer(file);
});