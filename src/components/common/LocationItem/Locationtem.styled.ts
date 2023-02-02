import styled from 'styled-components';

import {colors} from 'styles/shared';

export const wrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  width: 100%;
`;

export const contentContainer = styled.div`
  width: 100%;
`;

export const titleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const title = styled.div`
  cursor: pointer;
  color: ${colors.black};
  font-weight: bold;
  font-size: 22px;
`;

export const actionsContainer = styled.div`
  display: flex;
`;

export const actionLink = styled.div`
  cursor: pointer;
  padding: 10px 0 10px 10px;
`;
