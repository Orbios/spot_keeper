import {createClient} from '@supabase/supabase-js';

import config from 'config';
import uiHelper from 'helpers/uiHelper';

const supabase = createClient(config.supabase.url, config.supabase.key);

const LIST_TABLE = 'list';
const SPOT_TABLE = 'spot';
const STORAGE_TABLE = 'images';

export default {
  getLists,
  getList,
  createList,
  updateList,
  deleteList,
  searchLists,
  makeListPublic,
  updateListImage,
  searchSpots,
  saveSpot,
  deleteSpot,
  updateSpotImage,
  uploadImage,
  removeImage
};

//list actions

async function getLists(ownerId?: string): Promise<any[]> {
  try {
    const {data, error} = await supabase
      .from(LIST_TABLE)
      .select(
        `
      id,
      title,
      spots: spot (
        id,
        title,
        description
      )
    `
      )
      .match({ownerId});

    if (error) throw new Error(error.message);

    return data;
  } catch (err: any) {
    uiHelper.showError(err.message);
    return [];
  }
}

async function getList(id: number, isPublic: boolean): Promise<any> {
  try {
    const where: any = {
      id
    };

    if (isPublic) where.public = true;

    const {data, error} = await supabase
      .from(LIST_TABLE)
      .select(
        `
      id,
      title,
      description,
      imageUrl,
      public,
      spots: spot (
        id,
        title,
        description,
        imageUrl,
        mapLink
      )
    `
      )
      .match(where);

    if (error) throw new Error(error.message);

    return data[0];
  } catch (err: any) {
    uiHelper.showError(err.message);
  }
}

async function createList(title: string, userId?: string): Promise<number | null> {
  try {
    const {data, error} = await supabase.from(LIST_TABLE).insert({title, description: '', ownerId: userId}).select();

    if (error) throw new Error(error.message);

    return data[0]?.id;
  } catch (err: any) {
    uiHelper.showError(err.message);
    return null;
  }
}

async function updateList(listData: List): Promise<boolean> {
  try {
    const {data, error} = await supabase
      .from(LIST_TABLE)
      .update({
        title: listData.title,
        description: listData.description,
        imageUrl: listData.imageUrl
      })
      .match({id: listData.id})
      .select();

    if (error) throw new Error(error.message);

    return data[0]?.id ? true : false;
  } catch (err: any) {
    uiHelper.showError(err.message);
    return false;
  }
}

async function deleteList(listId: number, spotIds: number[]): Promise<boolean> {
  try {
    for (const spotId of spotIds) {
      await deleteSpot(spotId);
    }

    const {data, error} = await supabase.from(LIST_TABLE).delete().match({id: listId}).select();

    if (error) throw new Error(error.message);

    return data[0]?.id ? true : false;
  } catch (err: any) {
    uiHelper.showError(err.message);
    return false;
  }
}

async function searchLists(searchStr: string, ownerId?: string): Promise<any[]> {
  try {
    const words = searchStr.split(' ');
    const query = words.join('&');

    const {data, error} = await supabase
      .from(LIST_TABLE)
      .select(
        `
        id,
        title,
        description,
        imageUrl
    `
      )
      .match({ownerId})
      .textSearch('title', `${query}`);

    if (error) throw new Error(error.message);

    return data;
  } catch (err: any) {
    uiHelper.showError(err.message);
    return [];
  }
}

async function makeListPublic(listId: number): Promise<void> {
  try {
    // eslint-disable-next-line
    const {data, error} = await supabase.from(LIST_TABLE).update({public: true}).match({id: listId}).select('id');

    if (error) throw new Error(error.message);
  } catch (err: any) {
    uiHelper.showError(err.message);
  }
}

async function updateListImage(imageUrl: string, listId: number): Promise<boolean> {
  try {
    const {data, error} = await supabase
      .from(LIST_TABLE)
      .update({
        imageUrl
      })
      .match({id: listId})
      .select();

    if (error) throw new Error(error.message);

    return data[0]?.id ? true : false;
  } catch (err: any) {
    uiHelper.showError(err.message);
    return false;
  }
}

//spot actions

async function searchSpots(searchStr: string, ownerId?: string): Promise<any[]> {
  try {
    const words = searchStr.split(' ');
    const query = words.join('&');

    const {data, error} = await supabase
      .from(SPOT_TABLE)
      .select(
        `
        id,
        title,
        description,
        imageUrl,
        mapLink
    `
      )
      .match({ownerId})
      .textSearch('title', `${query}`);

    if (error) throw new Error(error.message);

    return data;
  } catch (err: any) {
    uiHelper.showError(err.message);
    return [];
  }
}

async function saveSpot(spotData: Spot, ownerId?: string): Promise<boolean> {
  try {
    if (spotData.id) {
      const {data, error} = await supabase
        .from(SPOT_TABLE)
        .update({
          title: spotData.title,
          description: spotData.description,
          listId: spotData.listId,
          mapLink: spotData.mapLink
        })
        .match({id: spotData.id})
        .select();

      if (error) throw new Error(error.message);

      return data[0]?.id ? true : false;
    } else {
      const {data, error} = await supabase
        .from(SPOT_TABLE)
        .insert({
          title: spotData.title,
          description: spotData.description,
          listId: spotData.listId,
          mapLink: spotData.mapLink,
          ownerId
        })
        .select();

      if (error) throw new Error(error.message);

      return data[0]?.id ? true : false;
    }
  } catch (err: any) {
    uiHelper.showError(err.message);
    return false;
  }
}

async function deleteSpot(spotId: number): Promise<boolean> {
  try {
    const {data, error} = await supabase.from(SPOT_TABLE).delete().match({id: spotId}).select();

    if (error) throw new Error(error.message);

    return data[0]?.id ? true : false;
  } catch (err: any) {
    uiHelper.showError(err.message);
    return false;
  }
}

async function updateSpotImage(imageUrl: string, spotId: number): Promise<boolean> {
  try {
    const {data, error} = await supabase
      .from(SPOT_TABLE)
      .update({
        imageUrl
      })
      .match({id: spotId})
      .select();

    if (error) throw new Error(error.message);

    return data[0]?.id ? true : false;
  } catch (err: any) {
    uiHelper.showError(err.message);
    return false;
  }
}

//storage actions

async function uploadImage(image: File, isSpot: boolean): Promise<string> {
  try {
    const imageName = image.name;
    const path = isSpot ? `spots/${imageName}` : `lists/${imageName}`;

    const {data, error} = await supabase.storage.from(STORAGE_TABLE).upload(path, image);

    if (error) throw new Error(error.message);

    return data?.path;
  } catch (err: any) {
    uiHelper.showError(err.message);
    return '';
  }
}

async function removeImage(fileName: string): Promise<any> {
  try {
    const {data, error} = await supabase.storage.from(STORAGE_TABLE).remove([fileName]);

    if (error) throw new Error(error.message);

    return data;
  } catch (err: any) {
    uiHelper.showError(err.message);
    return '';
  }
}
