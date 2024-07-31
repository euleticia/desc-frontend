'use client'
import React from 'react';
import logoImage from '../../../../public/assets/logo.png'
import Image from 'next/image';
import { HeaderContainer, Logo, LogoutIcon } from './style';


const HeaderComponent: React.FC = () => {
  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <HeaderContainer>
      <Logo>
        <Image src={logoImage} alt="Logo" />
      </Logo>
      <LogoutIcon onClick={handleLogout} />
    </HeaderContainer>
  );
};

export default HeaderComponent;
