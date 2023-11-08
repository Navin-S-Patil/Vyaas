import React from 'react'
import styled from 'styled-components'


const FlexHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FlexVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #000000;
`;

const HoldingsTab = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 20px;
`;


function PortfolioInvest() {
  return (
    <FlexHorizontal>

    </FlexHorizontal>
  )
}

export default PortfolioInvest