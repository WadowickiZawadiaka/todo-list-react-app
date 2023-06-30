import axios from 'axios';

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
