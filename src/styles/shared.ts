import {css} from 'styled-components';

import searchIcon from 'assets/search-icon.svg';

export const colors = {
  gray: '#b3b3b3',
  lightGray: '#d9dddc',
  white: '#FFFFFF',
  black: '#000000'
};

export const mediaQueries = {
  tablet: 'screen and (max-width: 768px)',
  desktop: 'screen and (max-width: 992px)'
};

export const sidePanelActionLink = css`
  color: ${colors.gray};
  text-decoration: none;

  :hover {
    color: ${colors.white};
  }
`;

export const searchInputCommon = css`
  background: url(${searchIcon}) no-repeat scroll;
  background-position: 2% 50%;
  background-color: ${colors.white};
  padding-left: 40px;
`;

export const spotImageSize = '90px';

export const listHeaderHeight = '240px';

export const listImageSize = '180px';

export const mobileSidePanelHeight = '100px';

// spots container variables
const INPUT_HEIGHT = '62px';

export const spotsContainerTopPadding = '24px';
export const spotsContainerMobilePadding = '15px';
export const spotsSearchContainerHeight = `calc(${INPUT_HEIGHT} + ${spotsContainerTopPadding})`;
export const spotsSearchContainerHeightMobile = `calc(${INPUT_HEIGHT} + ${spotsContainerMobilePadding})`;

export const spotsScrollableContainer = css`
  padding: ${spotsContainerTopPadding} 32px;
  overflow-y: auto;
  height: 100%;
  background-color: inherit;

  @media ${mediaQueries.tablet} {
    padding: ${spotsContainerMobilePadding};
  }
`;
