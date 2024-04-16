document.getElementById('upload').addEventListener('change', function (e) {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const heifFile = event.target.result;
      const heifDecoder = new libheif.HeifDecoder();
      const data = new Uint8Array(heifFile);

      try {
        const result = heifDecoder.decode(data);
        if (result.length > 0) {
          const image = result[0];
          const canvas = document.getElementById('canvas');
          canvas.width = image.display_width;
          canvas.height = image.display_height;
          const ctx = canvas.getContext('2d');
          const imageData = ctx.createImageData(canvas.width, canvas.height);
          imageData.data.set(image.data);
          ctx.putImageData(imageData, 0, 0);
        } else {
          console.error('No images found in HEIF file.');
        }
      } catch (error) {
        console.error('Error decoding HEIF image:', error);
      }
    };

    reader.readAsArrayBuffer(file);
  }
});
