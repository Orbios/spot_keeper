import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {isEmpty} from 'lodash';

import {useAppDispatch, useAppSelector} from 'hooks';

import {confirmAction} from 'reducers/commonSlice';
import spotActions from 'actions/spotActions';
import listActions from 'actions/listActions';
import storageActions from 'actions/storageActions';

import uiHelper from 'helpers/uiHelper';

import AppIcon from 'components/common/AppIcon';
import Locationtem from 'components/common/LocationItem';
import SaveSpot from './components/SaveSpot';
import EditList from './components/EditList';
import ListHeader from './components/header/ListHeader';

import * as styled from './ListPage.styled';

function ListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {id: listId} = useParams();

  const user = useAppSelector(state => state.user.current);

  const [list, setList] = useState<List | null>(null);
  const [displaySpots, setDisplaySpots] = useState<Spot[]>([]);
  const [spotToEdit, setSpotToEdit] = useState<Spot | null>(null);
  const [listToEdit, setListToEdit] = useState<List | null>(null);

  const [searchStr, setSearchStr] = useState<string>('');

  useEffect(() => {
    loadList();
  }, [listId]);

  useEffect(() => {
    filterSpots();
  }, [searchStr]);

  async function loadList() {
    if (!listId) return;

    const response = await dispatch(listActions.loadListById(Number(listId)));
    setList(response);
    setDisplaySpots(response.spots);
    setSearchStr('');
  }

  function filterSpots() {
    if (!list) return;

    const filteredSpots = list.spots.filter(spot => {
      const search = searchStr.trim().toLowerCase();

      if (isEmpty(search)) return true;

      return spot.title.toLowerCase().includes(searchStr) || spot.description.toLowerCase().includes(searchStr);
    });

    setDisplaySpots(filteredSpots);
  }

  function onAddSpot() {
    setSpotToEdit({
      id: 0,
      title: '',
      description: '',
      imageUrl: '',
      mapLink: '',
      listId: Number(listId),
      ownerId: ''
    });
  }

  function onEditSpot(spot) {
    setSpotToEdit(spot);
  }

  function onDeleteSpot(spotId, imageUrl) {
    dispatch(
      confirmAction({
        title: 'Delete spot',
        action: async () => {
          await deleteSpot(spotId, imageUrl);
        }
      })
    );
  }

  async function deleteSpot(spotId, imageUrl) {
    const isSuccess = await dispatch(spotActions.deleteSpot(spotId));

    if (isSuccess) {
      //remove related image in storage, if exists
      if (imageUrl) {
        await dispatch(storageActions.removeImage(imageUrl));
      }

      uiHelper.showMessage('Spot was deleted.');
      await loadList();
    }
  }

  function cancelEditSpot() {
    setSpotToEdit(null);
  }

  function updateSpotState(field: string, value: string) {
    if (!spotToEdit) return;
    setSpotToEdit({...spotToEdit, [field]: value});
  }

  async function onSaveSpot() {
    if (!spotToEdit) return;

    const isSuccess: boolean = await dispatch(spotActions.saveSpot(spotToEdit, user?.id));

    if (isSuccess) {
      uiHelper.showMessage('Spot was successfully updated!');
      await loadList();
      cancelEditSpot();
    }
  }

  function onEditList() {
    setListToEdit(list);
  }

  function cancelEditList() {
    setListToEdit(null);
  }

  function updateListState(field: string, value: string) {
    if (!listToEdit) return;
    setListToEdit({...listToEdit, [field]: value});
  }

  async function onSaveList() {
    if (!listToEdit) return;

    const isSuccess: boolean = await dispatch(listActions.updateList(listToEdit));

    if (isSuccess) {
      uiHelper.showMessage('List was successfully updated!');
      await loadList();
      cancelEditList();
    }
  }

  function onDeleteList() {
    dispatch(
      confirmAction({
        title: 'Delete list',
        action: async () => {
          await deleteList();
        }
      })
    );
  }

  async function deleteList() {
    if (!list) return;

    const spotIds = list.spots.map(spot => spot.id);

    const isSuccess: boolean = await dispatch(listActions.deleteList(Number(listId), spotIds));

    if (isSuccess) {
      //remove related image in storage, if exists
      if (list.imageUrl) {
        await dispatch(storageActions.removeImage(list.imageUrl));
      }

      uiHelper.showMessage('List was deleted.');
      navigate('/');
    }
  }

  async function updateSpotImage(spot: Spot, image: any) {
    //upload new image
    const imagePath: string = await dispatch(storageActions.uploadImage(image));

    if (!imagePath) return;

    //remove old image in storage, if exists
    if (spot.imageUrl) {
      await dispatch(storageActions.removeImage(spot.imageUrl));
    }

    //update imageUrl for spot
    const isSuccess: boolean = await dispatch(spotActions.updateSpotImage(imagePath, Number(spot.id)));

    if (isSuccess) {
      uiHelper.showMessage('Spot image was successfully updated!');
      await loadList();
    }
  }

  async function makePublic() {
    if (!list) return;
    await dispatch(listActions.makeListPublic(list.id));
  }

  async function updateListImage(image) {
    if (!list) return;

    //upload new image
    const imagePath: string = await dispatch(storageActions.uploadImage(image, false));

    if (!imagePath) return;

    //remove old image in storage, if exists
    if (list.imageUrl) {
      await dispatch(storageActions.removeImage(list.imageUrl));
    }

    //update imageUrl for spot
    const isSuccess: boolean = await dispatch(listActions.updateListImage(imagePath, Number(list.id)));

    if (isSuccess) {
      uiHelper.showMessage('List image was successfully updated!');
      await loadList();
    }
  }

  function render() {
    if (!list) return null;

    const anySpots = !isEmpty(list.spots);

    const saveSpotVisible = spotToEdit ? true : false;
    const editListVisible = listToEdit ? true : false;

    return (
      <>
        <ListHeader
          list={list}
          editMode={true}
          onEditList={onEditList}
          onDeleteList={onDeleteList}
          onMakePublic={makePublic}
          onImageUpdateHandler={updateListImage}
        />

        <styled.bodyContainer>
          <styled.bodyHeaderContainer>
            <styled.searchSpotInput
              name="search"
              placeholder="Search spots"
              value={searchStr}
              onChange={(field, value) => setSearchStr(value)}
            />

            <styled.addListAction onClick={onAddSpot}>
              <AppIcon icon="plus" />
              <styled.addListActionLabel>Add spot</styled.addListActionLabel>
            </styled.addListAction>
          </styled.bodyHeaderContainer>

          {anySpots &&
            displaySpots.map(spot => (
              <Locationtem
                key={spot.id}
                item={spot}
                isEditMode={true}
                onEditItem={onEditSpot}
                onDeleteItem={onDeleteSpot}
                onImageUpdate={updateSpotImage}
              />
            ))}

          {!anySpots && <div>Let's add some spots!</div>}

          {anySpots && searchStr && isEmpty(displaySpots) && <div>No spots found.</div>}
        </styled.bodyContainer>

        {saveSpotVisible && spotToEdit && (
          <SaveSpot
            visible={saveSpotVisible}
            spot={spotToEdit}
            onChange={updateSpotState}
            close={cancelEditSpot}
            save={onSaveSpot}
          />
        )}

        {editListVisible && listToEdit && (
          <EditList
            visible={editListVisible}
            list={listToEdit}
            onChange={updateListState}
            close={cancelEditList}
            save={onSaveList}
          />
        )}
      </>
    );
  }

  return render();
}

export default ListPage;
