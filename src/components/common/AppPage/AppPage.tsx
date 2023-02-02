import {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import Helmet from 'react-helmet';
import {useNavigate} from 'react-router-dom';

import userActions from 'actions/userActions';
import {useAppSelector, useAppDispatch} from 'hooks';

import SidePanel from 'components/side_panel/SidePanel';

import * as styled from './AppPage.styled';

interface Props {
  title: string;
  pageId: string;
  public?: boolean;
  children?: any;
}

function AppPage(props: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(state => state.user.current);

  const [readyToRender, setReadyToRender] = useState<boolean>(false);

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (!readyToRender) return;

    if (!isAuthenticated()) navigate('/login');
  }, [readyToRender]);

  async function initData() {
    if (!isAuthenticated()) await dispatch(userActions.getCurrentUser());
    setReadyToRender(true);
  }

  function isAuthenticated() {
    if (props.public) return true;
    return !isEmpty(user);
  }

  function getTitle() {
    return props.title ? `Spot Keeper - ${props.title}` : 'Spot Keeper';
  }

  function render() {
    if (!isAuthenticated()) return null;

    const title = getTitle();
    const isSharedListPage = props.pageId === 'shared_list';

    return (
      <>
        <Helmet title={title} />

        {props.public ? (
          <styled.authContainer withMargin={!isSharedListPage}>{props.children}</styled.authContainer>
        ) : (
          <styled.basicContainer>
            <SidePanel />

            <styled.bodyContainer>{props.children}</styled.bodyContainer>
          </styled.basicContainer>
        )}
      </>
    );
  }

  return render();
}

export default AppPage;
