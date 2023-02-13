import styled, {css} from 'styled-components';

import {colors, listHeaderHeight, listImageSize, mediaQueries} from 'styles/shared';

export const container = styled.div`
  position: relative;
  display: flex;
  height: ${listHeaderHeight};
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6) 100%);
  padding: 24px 32px;
  color: ${colors.white};

  @media ${mediaQueries.tablet} {
    padding: 15px;
  }
`;

export const actionContainer = styled.div`
  display: flex;
  position: absolute;
  right: 32px;

  @media ${mediaQueries.tablet} {
    right: 15px;
  }
`;

export const actionWrapper = styled.div`
  cursor: pointer;
  margin-left: 14px;
`;

export const imageContainer = styled.div<{isEditMode: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  height: ${listImageSize};
  width: ${listImageSize};
  max-width: ${listImageSize};
  margin-right: 24px;
  color: ${colors.gray};

  ${props =>
    props.isEditMode &&
    css`
      cursor: pointer;

      :hover {
        background: rgba(0, 0, 0, 0.3);
      }
    `}

  @media ${mediaQueries.tablet} {
    margin-right: 15px;
  }
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

export const title = styled.div<{editMode: boolean}>`
  font-size: 64px;
  font-weight: bold;

  ${props =>
    props.editMode &&
    css`
      cursor: pointer;
    `}

  @media ${mediaQueries.tablet} {
    font-size: 40px;
    margin-top: 35px;
  }
`;
