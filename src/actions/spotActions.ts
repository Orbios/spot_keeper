import helper from './actionHelper';

import dataService from 'services/dataService';

export default {
  searchSpots,
  saveSpot,
  deleteSpot,
  updateSpotImage
};

function searchSpots(searchStr: string, ownerId?: string) {
  return helper.dispatchAsyncAction(async () => {
    return await dataService.searchSpots(searchStr, ownerId);
  });
}

function saveSpot(spotData: Spot, ownerId?: string) {
  return helper.dispatchAsyncAction(async () => {
    return await dataService.saveSpot(spotData, ownerId);
  });
}

function deleteSpot(spotId: number) {
  return helper.dispatchAsyncAction(async () => {
    return await dataService.deleteSpot(spotId);
  });
}

function updateSpotImage(imageUrl: string, spotId: number) {
  return helper.dispatchAsyncAction(async () => {
    return await dataService.updateSpotImage(imageUrl, spotId);
  });
}
