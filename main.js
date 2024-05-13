import libheif from 'https://cdn.jsdelivr.net/npm/libheif-js@1.17.1/libheif-wasm/libheif-bundle.mjs';
const { HeifDecoder } = libheif();

const upload = document.querySelector('#upload');
const download = document.querySelector('#download');
const canvas = document.querySelector('canvas');

const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => resolve(new Uint8Array(e.target.result));
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });

const displayFile = async (buffer) => {
  const decoder = new HeifDecoder();

  const data = decoder.decode(buffer);
  const image = data[0];
  const width = image.get_width();
  const height = image.get_height();

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
};

const getCanvasImageBlob = () =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        return resolve(blob);
      }

      return reject(new Error('failed to convert the image'));
    });
  });

upload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  (async () => {
    const buffer = await readFile(file);

    console.time('coversion in:');
    await displayFile(buffer);
    console.timeEnd('coversion in:');

    // download trick, just for fun
    const blob = await getCanvasImageBlob();
    download.onclick = () => {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'result.jpg';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    };
    download.disabled = false;
  })().catch((err) => {
    console.error('failed to convert image:', err);
  });
});
