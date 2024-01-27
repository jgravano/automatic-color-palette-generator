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

const ColorBox = styled('div')(({ theme }) => ({
  width: '50px',
  height: '50px',
  position: 'relative',
  marginRight: theme.spacing(1),
  '&:hover': {
    cursor: 'pointer',
  },
}));

const Tooltip = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  marginBottom: theme.spacing(1),
  padding: theme.spacing(0.5),
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  visibility: 'hidden', 
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  '&.visible': {
    visibility: 'visible',
    opacity: 1,
  },
}));

function ImageUploader() {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [imageSrc, setImageSrc] = useState(null);
  const { data: palette, loading, error } = usePalette(imageSrc, 6, 'hex', {
    crossOrigin: 'anonymous',
    quality: 10,
  });

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

  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color).then(() => {
      console.log(`Color ${color} copied to the clipboard`);
    }).catch(err => {
      console.log('Something went wrong', err);
    });
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
                  <ColorBox
                  key={index}
                  style={{ backgroundColor: color }}
                  onMouseEnter={() => setHoverIndex(index)} // Al entrar el cursor
                  onMouseLeave={() => setHoverIndex(-1)} // Al salir el cursor
                  onClick={() => handleCopyColor(color)}
                >
                  <Tooltip className={hoverIndex === index ? 'visible' : ''}>
                    {color}
                  </Tooltip>
                </ColorBox>
                ))}
            </ColorPalette>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
