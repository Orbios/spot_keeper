import {useEffect, useState} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {isEmpty, last, max} from 'lodash';

import {useAppSelector, useAppDispatch} from 'hooks';

import userActions from 'actions/userActions';
import listActions from 'actions/listActions';

import AppIcon from 'components/common/AppIcon';

import Navigation from './components/Navigation';

import * as styled from './SidePanel.styled';

import Logo from 'assets/logo.svg';

const DEFAULT_LIST_TITLE = 'My List #';

function SidePanel() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppSelector(state => state.user.current);
  const lists = useAppSelector(state => state.list.lists);

  const {id: listId} = useParams();

  const [mobileMenuVisible, setMobileMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    toggleMobileMenu();
  }, [location]);

  async function loadData() {
    await dispatch(listActions.loadLists(user?.id));
  }

  async function onLogOut() {
    await dispatch(userActions.logOut());

    navigate('/login');
  }

  function navigateToListPage(id: number) {
    navigate(`/list/${id}`);
  }

  function generateNewListTitle() {
    const defaultLists = lists.filter(list => list.title.includes(DEFAULT_LIST_TITLE));

    if (isEmpty(defaultLists)) return `${DEFAULT_LIST_TITLE}1`;

    const listNumbers = defaultLists.map(list => {
      const parts = list.title.split('#');
      return Number(last(parts));
    });

    const maxNumber = max(listNumbers);
    const nextNumber = maxNumber ? maxNumber + 1 : 1;

    return `${DEFAULT_LIST_TITLE}${nextNumber}`;
  }

  async function addNewList() {
    const listTitle = generateNewListTitle();

    const newListId: number | null = await dispatch(listActions.addNewList(listTitle, user?.id));

    if (newListId) {
      await loadData();
      navigateToListPage(newListId);
    }
  }

  function toggleMobileMenu() {
    setMobileMenuVisible(visible => !visible);
  }

  function render() {
    const userName = user?.user_metadata?.first_name;

    return (
      <styled.wrapper fullHeight={mobileMenuVisible}>
        <styled.headerContainer>
          <styled.header>
            <img alt="Logo" src={Logo} height="40" />
            <styled.title>Spot Keeper</styled.title>
          </styled.header>

          <div>
            {userName}
            <styled.authLink variant="link" onClick={onLogOut}>
              <AppIcon icon="sign-out" />
            </styled.authLink>
          </div>

          <styled.toggleButton variant="link" onClick={toggleMobileMenu}>
            <AppIcon icon={mobileMenuVisible ? 'closeMenu' : 'menu'} size="lg" color="white" />
          </styled.toggleButton>
        </styled.headerContainer>

        <Navigation addNewList={addNewList} />

        <styled.listsContainer>
          {lists.map(list => {
            const isActive = list.id.toString() === listId ? true : false;

            return (
              <styled.listAction
                key={list.id}
                variant="link"
                active={isActive}
                onClick={() => navigateToListPage(list.id)}>
                {list.title}
              </styled.listAction>
            );
          })}
        </styled.listsContainer>
      </styled.wrapper>
    );
  }

  return render();
}

export default SidePanel;
