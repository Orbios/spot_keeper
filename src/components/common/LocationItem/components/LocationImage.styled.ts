import styled, {css} from 'styled-components';

import {colors, spotImageSize} from 'styles/shared';

export const imageContainer = styled.div<{isEditMode: boolean}>`
  display: flex;
  border: 1px solid ${colors.black};
  min-width: ${spotImageSize};
  height: ${spotImageSize};
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-top: 8px;

  ${props =>
    props.isEditMode &&
    css`
      cursor: pointer;

      :hover {
        background-color: rgba(0, 0, 0, 0.4);
        border: none;
      }
    `}
`;

export const image = styled.img`
  object-fit: cover;
`;

export const hoverContainer = styled.div`
  color: ${colors.white};
`;

export const uploadInput = styled.input`
  display: none;
`;
