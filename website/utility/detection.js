import { ImageAnnotatorClient } from '@google-cloud/vision';
const client = new ImageAnnotatorClient();

// Replace with the path to your image
const imageFilePath = 'image.jpeg';

// Read the image file into a Buffer
const imageFile = require('fs').readFileSync(imageFilePath);

// Perform the label detection
client
  .textDetection(imageFile)
  .then(results => {
    const detections = results[0].textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
