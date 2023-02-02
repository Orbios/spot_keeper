import styled, {css} from 'styled-components';

import {colors, sidePanelActionLink} from 'styles/shared';

export const navigation = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #282828;
`;

export const navigationItem = styled.li<{active: boolean; gap?: boolean}>`
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  ${sidePanelActionLink};

  margin-bottom: ${props => props.gap && '24px'};

  ${props =>
    props.active &&
    css`
      color: ${colors.white};
    `}
`;

export const title = styled.div`
  margin-left: 20px;
  font-size: 14px;
`;
