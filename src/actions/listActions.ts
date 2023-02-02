import {loadLists as getLists, updateList as updateListAction, removeList} from 'reducers/listSlice';

import helper from './actionHelper';

import dataService from 'services/dataService';

export default {
  loadLists,
  loadListById,
  addNewList,
  updateList,
  deleteList,
  searchLists,
  makeListPublic,
  updateListImage
};

function loadLists(ownerId?: string) {
  return helper.dispatchAsyncAction(async dispatch => {
    const lists = await dataService.getLists(ownerId);
    dispatch(getLists(lists));
  });
}

function loadListById(id: number, isPublic = false) {
  return helper.dispatchAsyncAction(async () => {
    return await dataService.getList(id, isPublic);
  });
}

function addNewList(title: string, userId?: string) {
  return helper.dispatchAsyncAction(async () => {
    return await dataService.createList(title, userId);
  });
}

function updateList(list: List) {
  return helper.dispatchAsyncAction(async dispatch => {
    const response = await dataService.updateList(list);
    dispatch(updateListAction(list));
    return response;
  });
}

function deleteList(id: number, spotIds: number[]) {
  return helper.dispatchAsyncAction(async dispatch => {
    const response = await dataService.deleteList(id, spotIds);
    dispatch(removeList(id));
    return response;
  });
}

function searchLists(searchStr: string, userId?: string) {
  return helper.dispatchAsyncAction(async () => {
    return await dataService.searchLists(searchStr, userId);
  });
}

function makeListPublic(listId: number) {
  return helper.dispatchAsyncAction(async () => {
    return await dataService.makeListPublic(listId);
  });
}

function updateListImage(imageUrl: string, listId: number) {
  return helper.dispatchAsyncAction(async () => {
    return await dataService.updateListImage(imageUrl, listId);
  });
}
