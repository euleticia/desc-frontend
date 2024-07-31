import styled from 'styled-components';
import { FaSignOutAlt } from 'react-icons/fa';


export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #ffffff;
  color: white;
  width: 100%;
  height: 120px;  
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 10px;
    height: 60px; 
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    height: auto;
    max-height: 60px; 
    width: auto;
  }
`;

export const LogoutIcon = styled(FaSignOutAlt)`
  cursor: pointer;
  font-size: 1.5em;
  color: #8b8787;

  &:hover {
    color: #61dafb;
  }
`;