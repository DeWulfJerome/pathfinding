import React from 'react';
import styled from 'styled-components';

const Stripe = styled.div`
  background: #fff;
  height: 4px;
  width: 25px;
  border-radius: 3px;
`;

const HamburgerContainer = styled.div`
  height: 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CrossContainer = styled.div`
  height: 25px;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CrossStripe = styled(Stripe)`
  transform: ${(props) => (props.isFirst ? 'rotate(45deg)' : 'rotate(-45deg)')};
  position: absolute;
`;

export default function Hamburger({ open, onOpenClick }) {
  return !open ? (
    <HamburgerContainer onClick={onOpenClick}>
      <Stripe></Stripe>
      <Stripe></Stripe>
      <Stripe></Stripe>
    </HamburgerContainer>
  ) : (
    <CrossContainer onClick={onOpenClick}>
      <CrossStripe isFirst></CrossStripe>
      <CrossStripe isFirst={false}></CrossStripe>
    </CrossContainer>
  );
}
