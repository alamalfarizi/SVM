import React, { useState } from "react";
import { Button } from "@mui/material";

const ImageUpload = ({ onImageUpload, previewImage, title = 'Upload', disabled = false }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
      onImageUpload(files[0]);
    }
  };

  const imageToShow = selectedImage ? URL.createObjectURL(selectedImage) : previewImage;

  return (
    <div>
      {imageToShow && (
        <div>
          <h2>Gambar Preview</h2>
          <img
            crossOrigin="anonymous"
            src={imageToShow}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "contain",
              background: "black",
            }}
          />
        </div>
      )}
      <label>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
          disabled={disabled}
        />
        <Button
          variant="contained"
          color="secondary"
          component="span"
          sx={{ mt: 3, mb: 2, float: "right" }}
        >
          { title }
        </Button>
      </label>
    </div>
  );
};

export default ImageUpload;
