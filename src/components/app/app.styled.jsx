import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
export const Navigation = styled.nav`
  display: flex;
  gap: 15px;
`;
export const LinkNav = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;

  &.active {
    color: white;
    background-color: orangered;
  }
`;
export const Container = styled.div`
  padding: 20px;
`;
