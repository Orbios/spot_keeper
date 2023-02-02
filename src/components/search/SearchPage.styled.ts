import styled from 'styled-components';

import {colors, mediaQueries, mobileSidePanelHeight} from 'styles/shared';

import TextInput from 'components/common/TextInput';

export const wrapper = styled.div`
  padding: 24px 34px;
  overflow-y: auto;
  background-color: ${colors.lightGray};
  height: 100%;

  @media ${mediaQueries.tablet} {
    padding: 15px;
    height: calc(100vh - ${mobileSidePanelHeight});
  }
`;

export const searchWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 100px;

  @media ${mediaQueries.tablet} {
    margin-bottom: 20px;
  }
`;

export const searchInput = styled(TextInput)`
  min-width: 340px;
  width: 340px;
  background: url(/images/search-icon.svg) no-repeat scroll;
  background-position: 2% 50%;
  background-color: ${colors.white};
  padding-left: 40px;
  margin-right: 20px;

  @media ${mediaQueries.tablet} {
    width: 300px;
    min-width: auto;
  }
`;

export const containerCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;

  @media ${mediaQueries.tablet} {
    margin-top: 50px;
  }
`;

export const clearActionContainer = styled.div`
  cursor: pointer;
`;
