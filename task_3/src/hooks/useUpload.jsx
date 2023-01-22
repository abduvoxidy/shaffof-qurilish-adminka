import React, { useState } from "react";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {selectedImage && (
        <div className="my-3">
          <img
            alt="not fount"
            width={"180px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button
            className="btn btn-sm btn-light"
            onClick={() => setSelectedImage(null)}
          >
            Remove
          </button>
        </div>
      )}
      <br />

      <br />
      <input
        accept="image/*"
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;
