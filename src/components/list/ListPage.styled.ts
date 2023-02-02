import styled from 'styled-components';

import {listHeaderHeight, colors, mediaQueries, mobileSidePanelHeight} from 'styles/shared';

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

export const addSpotContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const addListAction = styled.div`
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;

export const addListActionLabel = styled.span`
  margin-left: 7px;
`;
