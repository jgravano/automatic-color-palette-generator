import React, { useState } from 'react';
import { Button } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      display: 'none',
    },
    imagePreview: {
      marginTop: theme.spacing(2),
      maxHeight: '300px',
    },
  })
);

function ImageUploader() {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="upload-image"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="upload-image">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      {image && <img src={image} alt="Uploaded" className={classes.imagePreview} />}
    </div>
  );
}

export default ImageUploader;
