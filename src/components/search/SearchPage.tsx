import {useState} from 'react';
import {isEmpty} from 'lodash';
import {MagnifyingGlass} from 'react-loader-spinner';

import {useAppSelector, useAppDispatch} from 'hooks';

import listActions from 'actions/listActions';
import spotActions from 'actions/spotActions';

import Locationtem from 'components/common/LocationItem';
import AppIcon from 'components/common/AppIcon';

import * as styled from './SearchPage.styled';

function SearchPage() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.current);

  const [spots, setSpots] = useState<Spot[]>([]);
  const [lists, setLists] = useState<List[]>([]);

  const [searchStr, setSearchStr] = useState<string>('');
  const [searchCompleted, setSearchCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onChange(field: string, value: string) {
    setSearchStr(value);
    setSearchCompleted(false);
  }

  async function onSearch(e) {
    if (e) e.preventDefault();
    await searchPlaces();
  }

  function onClear() {
    setSearchStr('');
    setSpots([]);
    setLists([]);
  }

  async function searchPlaces() {
    const userId = user?.id;

    try {
      setLists([]);
      setSpots([]);
      setIsLoading(true);

      const searchedLists: List[] = await dispatch(listActions.searchLists(searchStr, userId));
      setLists(searchedLists);

      const searchedSpots: Spot[] = await dispatch(spotActions.searchSpots(searchStr, userId));
      setSpots(searchedSpots);
    } catch (e) {
      setIsLoading(false);
    } finally {
      setSearchCompleted(true);
      setIsLoading(false);
    }
  }

  function render() {
    const anyLists = !isEmpty(lists);
    const anySpots = !isEmpty(spots);
    const notFound = !anyLists && !anySpots && searchCompleted && searchStr;

    return (
      <styled.wrapper>
        <styled.searchWrapper>
          <styled.searchInput
            name="search"
            placeholder="Where do you want to go?"
            value={searchStr}
            onChange={onChange}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                onSearch(event);
              }
            }}
          />
          {searchStr && (
            <styled.clearActionContainer onClick={onClear}>
              <AppIcon icon="close" size="lg" />
            </styled.clearActionContainer>
          )}
        </styled.searchWrapper>

        <br />

        {isLoading ? (
          <styled.containerCentered>
            <MagnifyingGlass
              visible={true}
              height="100"
              width="100"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="black"
            />
          </styled.containerCentered>
        ) : (
          <>
            {notFound && (
              <styled.containerCentered>
                <h3>No results found for "{searchStr}"</h3>
              </styled.containerCentered>
            )}
            {anyLists && lists.map(list => <Locationtem key={list.id} item={list} />)}
            {anySpots && spots.map(spot => <Locationtem key={spot.id} item={spot} />)}
          </>
        )}
      </styled.wrapper>
    );
  }

  return render();
}

export default SearchPage;
