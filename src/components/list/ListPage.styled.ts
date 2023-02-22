import styled from 'styled-components';

import TextInput from 'components/common/TextInput';

import {listHeaderHeight, colors, mediaQueries, mobileSidePanelHeight} from 'styles/shared';

import searchIcon from 'assets/search-icon.svg';

const PADDING_TOP = '24px';
const PADDING_TOP_MOBILE = '15px';
const INPUT_HEIGHT = '62px';
const BODY_HEADER_HEIGHT = `calc(${INPUT_HEIGHT} + ${PADDING_TOP})`;
const BODY_HEADER_HEIGHT_MOBILE = `calc(${INPUT_HEIGHT} + ${PADDING_TOP_MOBILE})`;

export const bodyContainer = styled.div`
  background-color: ${colors.lightGray};
  height: calc(100vh - ${listHeaderHeight} - ${BODY_HEADER_HEIGHT});
  width: 100%;

  @media ${mediaQueries.tablet} {
    height: calc(100vh - ${listHeaderHeight} - ${mobileSidePanelHeight} - ${BODY_HEADER_HEIGHT_MOBILE});
  }
`;

export const toolsPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: ${PADDING_TOP} 32px 0;

  @media ${mediaQueries.tablet} {
    padding: ${PADDING_TOP_MOBILE} ${PADDING_TOP_MOBILE} 0;
  }
`;

export const scrollableContainer = styled.div`
  padding: ${PADDING_TOP} 32px;
  overflow-y: auto;
  height: 100%;
  background-color: inherit;

  @media ${mediaQueries.tablet} {
    padding: ${PADDING_TOP_MOBILE};
  }
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
