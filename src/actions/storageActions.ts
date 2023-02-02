import helper from './actionHelper';

import dataService from 'services/dataService';

export default {
  uploadImage,
  removeImage
};

function uploadImage(image: File, isSpot = true) {
  return helper.dispatchAsyncAction(async () => {
    return await dataService.uploadImage(image, isSpot);
  });
}

function removeImage(imagePath: string) {
  return helper.dispatchAsyncAction(async () => {
    return await dataService.removeImage(imagePath);
  });
}
