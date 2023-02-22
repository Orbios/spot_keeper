import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {isEmpty} from 'lodash';

import {useAppDispatch} from 'hooks';

import listActions from 'actions/listActions';

import ListHeader from 'components/list/components/header/ListHeader';
import Locationtem from 'components/common/LocationItem';

import * as styled from './SharedListPage.styled';

function ShareListPage() {
  const dispatch = useAppDispatch();

  const {id: listId} = useParams();

  const [list, setList] = useState<List | null>(null);
  const [displaySpots, setDisplaySpots] = useState<Spot[]>([]);
  const [searchStr, setSearchStr] = useState<string>('');
  const [readyToRender, setReadyToRender] = useState<boolean>(false);

  useEffect(() => {
    loadList();
  }, [listId]);

  useEffect(() => {
    filterSpots();
  }, [searchStr]);

  async function loadList() {
    if (!listId) return;

    const response = await dispatch(listActions.loadListById(Number(listId), true));
    setList(response);
    setDisplaySpots(response.spots);
    setReadyToRender(true);
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

  function render() {
    if (!readyToRender) return null;

    const notAllowed = list ? false : true;

    const anySpots = !isEmpty(list?.spots);

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
              <styled.searchPanel>
                <styled.searchSpotInput
                  name="search"
                  placeholder="Search spots"
                  value={searchStr}
                  onChange={(field, value) => setSearchStr(value)}
                />
              </styled.searchPanel>

              <styled.scrollableContainer>
                {anySpots && displaySpots.map(spot => <Locationtem key={spot.id} item={spot} />)}

                {!anySpots && <div>There are no any spots for current list.</div>}

                {anySpots && searchStr && isEmpty(displaySpots) && <div>No spots found.</div>}
              </styled.scrollableContainer>
            </styled.bodyContainer>
          </>
        )}
      </styled.wrapper>
    );
  }

  return render();
}

export default ShareListPage;
