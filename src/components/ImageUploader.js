import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { usePalette } from 'color-thief-react';

const Input = styled('input')({
  display: 'none',
});

const ImagePreview = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxHeight: '300px',
}));

const ColorPalette = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
}));

const ColorBox = styled('div')({
  width: '50px',
  height: '50px',
});

function ImageUploader() {
  const [imageSrc, setImageSrc] = useState(null);

  // Se asume que 'palette' devolverá un array de colores.
  const { data: palette, loading, error } = usePalette(imageSrc, 6, 'hex', {
    crossOrigin: 'anonymous',
    quality: 10,
  });

  // Imprimir en consola el valor de 'palette' para depuración.
  console.log('Palette:', palette);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver}>
      <div>
        <label htmlFor="upload-image">
          <Input accept="image/*" id="upload-image" type="file" onChange={handleImageChange} />
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>
        {imageSrc && (
          <>
            <ImagePreview src={imageSrc} alt="Uploaded" />
            <ColorPalette>
              {Array.isArray(palette) && !loading && !error &&
                palette.map((color, index) => (
                  <ColorBox key={index} style={{ backgroundColor: color }} />
                ))}
            </ColorPalette>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
