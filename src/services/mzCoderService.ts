import geoCoder from 'mzcoder';

const exports = {
  getCode,
  getDistance,
  findCoordinatesOnMap
};

function getCode(lat: number, lng: number) {
  return geoCoder.getCode(lat, lng);
}

function getDistance(start: number[], end: number[], accuracy: number) {
  return geoCoder.getDistance(start, end, accuracy);
}

function findCoordinatesOnMap(code: string) {
  return geoCoder.decode(code);
}

export default exports;
