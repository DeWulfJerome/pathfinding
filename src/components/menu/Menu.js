import React, { useState } from 'react';
import styled from 'styled-components';

import Hamburger from './Hamburger';

const MENU_BUTTON_HEIGHT = 50;

const SlidingMenu = styled.div`
  position: absolute;
  top: ${MENU_BUTTON_HEIGHT + 'px'};
  bottom: 0;
  left: ${(props) => (props.menuOpen ? '0%' : '-100%')};
  opacity: ${(props) => (props.menuOpen ? '1' : '0')};
  z-index: ${(props) => (props.menuOpen ? '10' : '-1')};
  transition: all 0.3s ease;
`;

const MenuBtnContainer = styled.div`
  height: ${MENU_BUTTON_HEIGHT + 'px'};
  padding-left: ${MENU_BUTTON_HEIGHT + 'px'};
  display: flex;
  align-items: center;
`;

const SettingsText = styled.p`
  color: #fff;
  margin-left: 1rem;
`;

export default function Menu({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <MenuBtnContainer>
        <Hamburger
          onOpenClick={toggleMenu}
          open={menuOpen}
          height={MENU_BUTTON_HEIGHT}
        ></Hamburger>
        <SettingsText>Settings</SettingsText>
      </MenuBtnContainer>
      <SlidingMenu menuOpen={menuOpen}>{children}</SlidingMenu>
    </div>
  );
}
