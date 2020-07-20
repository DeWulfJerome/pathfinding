import React, { useState } from 'react';
import styled from 'styled-components';

import Hamburger from './Hamburger';
import StyleConstants from '../../StyleConstants';

const MENU_BUTTON_HEIGHT = 80;

const RowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: ${MENU_BUTTON_HEIGHT + 'px'};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: transparent;
  border-radius: 40px;
  border: 2px solid ${StyleConstants.colors.blue.light};
  box-shadow: 0 0 5px 2px ${StyleConstants.colors.blue.shade};
  padding: 0.7rem 2rem;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.04);
  }
  &:focus {
    outline: 0;
    box-shadow: 0 0 15px 2px ${StyleConstants.colors.blue.shade};
  }
`;

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
  padding-left: 1.2rem;
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

const SettingsText = styled.p`
  color: #fff;
  margin-left: 1rem;
`;

export default function Menu({ visualize, children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <RowGrid>
        <MenuBtnContainer onClick={toggleMenu}>
          <Hamburger open={menuOpen} height={MENU_BUTTON_HEIGHT}></Hamburger>
          <SettingsText>Settings</SettingsText>
        </MenuBtnContainer>
        <ButtonContainer>
          <Button
            onClick={() => {
              visualize('dijkstra');
            }}
          >
            Visualize!
          </Button>
        </ButtonContainer>
      </RowGrid>
      <SlidingMenu menuOpen={menuOpen}>{children}</SlidingMenu>
    </div>
  );
}
