import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useAppDispatch} from 'hooks';

import listActions from 'actions/listActions';

import ListHeader from 'components/list/components/header/ListHeader';
import Locationtem from 'components/common/LocationItem';

import * as styled from './SharedListPage.styled';

function ShareListPage() {
  const dispatch = useAppDispatch();

  const {id: listId} = useParams();

  const [list, setList] = useState<List | null>(null);
  const [readyToRender, setReadyToRender] = useState<boolean>(false);

  useEffect(() => {
    loadList();
    setReadyToRender(true);
  }, [listId]);

  async function loadList() {
    if (!listId) return;

    const response = await dispatch(listActions.loadListById(Number(listId), true));
    setList(response);
  }

  function render() {
    if (!readyToRender) return null;

    const notAllowed = list ? false : true;

    return (
      <styled.wrapper>
        {notAllowed && (
          <styled.noAccessContainer>
            <h3>List doesn't exist or private...</h3>
          </styled.noAccessContainer>
        )}

        {list && (
          <>
            <ListHeader list={list} editMode={false} />

            <styled.bodyContainer>
              {list.spots.map(spot => (
                <Locationtem key={spot.id} item={spot} />
              ))}
            </styled.bodyContainer>
          </>
        )}
      </styled.wrapper>
    );
  }

  return render();
}

export default ShareListPage;
