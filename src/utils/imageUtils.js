const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calcular las nuevas dimensiones manteniendo la proporción
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a base64
        const base64String = canvas.toDataURL('image/jpeg', 0.7);
        resolve(base64String.split(',')[1]); // Solo retornamos la parte base64
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export { resizeImage }; 