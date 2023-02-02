import {v4 as uuidv4} from 'uuid';

const exports = {
  getRandomUid
};

function getRandomUid() {
  return uuidv4();
}

export default exports;
