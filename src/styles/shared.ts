import {css} from 'styled-components';

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

export const spotImageSize = '90px';

export const listHeaderHeight = '240px';

export const listImageSize = '180px';

export const mobileSidePanelHeight = '100px';
