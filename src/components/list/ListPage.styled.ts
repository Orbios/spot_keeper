import styled from 'styled-components';

import TextInput from 'components/common/TextInput';

import {listHeaderHeight, colors, mediaQueries, mobileSidePanelHeight} from 'styles/shared';

import searchIcon from 'assets/search-icon.svg';

export const bodyContainer = styled.div`
  padding: 24px 32px;
  background-color: ${colors.lightGray};
  height: calc(100vh - ${listHeaderHeight});
  overflow-y: scroll;
  width: 100%;

  @media ${mediaQueries.tablet} {
    padding: 15px;
    height: calc(100vh - ${listHeaderHeight} - ${mobileSidePanelHeight});
  }
`;

export const bodyHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const searchSpotInput = styled(TextInput)`
  background: url(${searchIcon}) no-repeat scroll;
  background-position: 2% 50%;
  background-color: ${colors.white};
  padding-left: 40px;
  min-width: 350px;

  @media ${mediaQueries.tablet} {
    min-width: auto;
  }
`;

export const addListAction = styled.div`
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;

export const addListActionLabel = styled.span`
  margin-left: 7px;
`;
