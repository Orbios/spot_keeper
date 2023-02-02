import styled from 'styled-components';

import {colors, listHeaderHeight} from 'styles/shared';

export const wrapper = styled.div`
  height: 100vh;
  background-color: ${colors.lightGray};
`;

export const bodyContainer = styled.div`
  padding: 24px 32px;
  height: calc(100vh - ${listHeaderHeight});
  overflow-y: scroll;
  width: 100%;
`;

export const noAccessContainer = styled.div`
  text-align: center;
  padding-top: 200px;
`;
