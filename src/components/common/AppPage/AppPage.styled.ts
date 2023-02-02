import styled from 'styled-components';

import {mediaQueries, mobileSidePanelHeight} from 'styles/shared';

export const basicContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr;
  height: 100vh;

  @media ${mediaQueries.desktop} {
    grid-template-columns: 4fr 8fr;
  }
  @media ${mediaQueries.tablet} {
    grid-template-columns: 12fr;
    height: 100%;
  }
`;

export const bodyContainer = styled.div`
  @media ${mediaQueries.tablet} {
    margin-top: ${mobileSidePanelHeight};
  }
`;

export const authContainer = styled.div<{withMargin: boolean}>`
  margin-top: ${props => (props.withMargin ? '40px' : 0)};
`;
