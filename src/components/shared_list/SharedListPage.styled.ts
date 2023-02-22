import styled from 'styled-components';

import {
  colors,
  listHeaderHeight,
  mediaQueries,
  spotsContainerTopPadding,
  spotsContainerMobilePadding,
  spotsSearchContainerHeight,
  searchInputCommon,
  spotsScrollableContainer
} from 'styles/shared';

import TextInput from 'components/common/TextInput';

export const wrapper = styled.div`
  height: 100vh;
  background-color: ${colors.lightGray};
`;

export const bodyContainer = styled.div`
  height: calc(100vh - ${listHeaderHeight} - ${spotsSearchContainerHeight});
  width: 100%;
`;

export const noAccessContainer = styled.div`
  text-align: center;
  padding-top: 200px;
`;

export const searchPanel = styled.div`
  padding: ${spotsContainerTopPadding} 32px 0;
  max-width: 450px;

  @media ${mediaQueries.tablet} {
    padding: ${spotsContainerMobilePadding} ${spotsContainerMobilePadding} 0;
    max-width: 100%;
  }
`;

export const searchSpotInput = styled(TextInput)`
  ${searchInputCommon};
`;

export const scrollableContainer = styled.div`
  ${spotsScrollableContainer};
`;
