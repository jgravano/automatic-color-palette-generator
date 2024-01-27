import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { usePalette } from 'color-thief-react';

const UploadArea = styled(Paper)(({ theme }) => ({
  height: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  background: theme.palette.action.hover,
  borderStyle: 'dashed',
}));

const PreviewImage = styled('img')(({ theme }) => ({
  maxHeight: '400px',
  maxWidth: '100%',
  display: 'block', // or 'none' if no image is uploaded
  margin: '0 auto',
  marginBottom: theme.spacing(2),
}));

const ColorPalette = styled(Stack)({
  direction: 'row',
  spacing: 1,
  marginBottom: 2,
});

const CopyButtons = styled(Stack)(({ theme }) => ({
  direction: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  '& button': {
    margin: theme.spacing(1),
  },
}));

const Input = styled('input')({
  display: 'none',
});

const ImagePreview = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxHeight: '300px',
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
    <Stack spacing={2} sx={{ width: '100%', margin: 'auto', maxWidth: 600 }}>
      <UploadArea onDrop={handleDrop} onDragOver={handleDragOver}>
        <label htmlFor="upload-image">
          {imageSrc ? (
            <PreviewImage src={imageSrc} alt="Uploaded" />
          ) : (
            "Click here to upload or drag and drop"
          )}
          <Input accept="image/*" id="upload-image" type="file" onChange={handleImageChange} />
        </label>
      </UploadArea>
      {palette && (
        <>
          <ColorPalette>
            {palette.map((color, index) => (
              <ColorBox
                key={index}
                style={{ backgroundColor: color }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
                onClick={() => handleCopyColor(color)}
              >
                <Tooltip className={hoverIndex === index ? 'visible' : ''}>
                  {color}
                </Tooltip>
              </ColorBox>
            ))}
          </ColorPalette>
          <CopyButtons>
            <Button variant="outlined">Copy as CSS</Button>
            <Button variant="outlined">Copy as JSON</Button>
            <Button variant="outlined">Copy as HEX</Button>
          </CopyButtons>
        </>
      )}
    </Stack>
  );
}

export default ImageUploader;