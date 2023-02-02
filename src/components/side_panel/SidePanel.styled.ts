import styled, {css} from 'styled-components';

import {Button} from 'components/bootstrap';

import {colors, sidePanelActionLink, mediaQueries, mobileSidePanelHeight} from 'styles/shared';

export const wrapper = styled.div<{fullHeight: boolean}>`
  padding: 24px 24px 0;
  background-color: ${colors.black};
  color: ${colors.white};
  overflow-y: auto;

  @media ${mediaQueries.tablet} {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 15px;
    height: ${mobileSidePanelHeight};
    overflow-y: hidden;

    ${props =>
      props.fullHeight &&
      css`
        height: 100%;
        z-index: 100;
      `}
  }
`;

export const headerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;

  @media ${mediaQueries.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const toggleButton = styled(Button)`
  display: none;
  position: absolute;

  @media ${mediaQueries.tablet} {
    display: initial;
    right: 0;
    top: 0;
  }
`;

export const header = styled.div`
  display: flex;
  align-items: center;
`;

export const title = styled.div`
  font-size: 26px;
  margin-left: 10px;
  font-weight: bold;
`;

export const authLink = styled(Button)`
  color: ${colors.gray};

  :hover {
    color: ${colors.white};
  }
`;

export const actionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const listsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

export const listAction = styled(Button)<{active: boolean}>`
  height: 32px;
  padding: 0;

  ${sidePanelActionLink};

  ${props =>
    props.active &&
    css`
      color: ${colors.white}!important;
    `}
`;
