import React, { useState, useEffect } from 'react';
import axios from "axios";

function APOD() {
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAPODImage(handleImageCallback);
  }, []);

  const handleImageCallback = (imageData) => {
    setImageURL(imageData.imageUrl);
    setDescription(imageData.description);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
    <h4 className="text-center my-4">Astro photo of the day</h4>
    <p></p>
    <div className="text-center">
      <img src={imageURL} alt="APOD" className="mx-auto d-block my-4" />
      <p>{description}</p>
    </div>
    </>
  );
}

export const getAPODImage = (myCallback) => {
  axios
    .get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: '5qxzTq8T3vHrbFhaf52VW7ND7upKXSFAJ1jjuFjy',
      },
      responseType: 'json',
    })
    .then((response) => {
      const imageData = {
        imageUrl: response.data.hdurl,
        description: response.data.explanation,
      };
      myCallback(imageData);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default APOD;