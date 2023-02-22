import styled from 'styled-components';

import TextInput from 'components/common/TextInput';

import {
  listHeaderHeight,
  colors,
  mediaQueries,
  mobileSidePanelHeight,
  spotsContainerTopPadding,
  spotsContainerMobilePadding,
  spotsSearchContainerHeight,
  spotsSearchContainerHeightMobile,
  searchInputCommon,
  spotsScrollableContainer
} from 'styles/shared';

export const bodyContainer = styled.div`
  background-color: ${colors.lightGray};
  height: calc(100vh - ${listHeaderHeight} - ${spotsSearchContainerHeight});
  width: 100%;

  @media ${mediaQueries.tablet} {
    height: calc(100vh - ${listHeaderHeight} - ${mobileSidePanelHeight} - ${spotsSearchContainerHeightMobile});
  }
`;

export const toolsPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: ${spotsContainerTopPadding} 32px 0;

  @media ${mediaQueries.tablet} {
    padding: ${spotsContainerMobilePadding} ${spotsContainerMobilePadding} 0;
  }
`;

export const scrollableContainer = styled.div`
  ${spotsScrollableContainer};
`;

export const searchSpotInput = styled(TextInput)`
  ${searchInputCommon};
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
