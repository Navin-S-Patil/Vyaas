import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 20px;
  margin-top: 20px;
  padding: 20px;
`;  

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
  color: #036AD1;
  text-align: center;
  align-items: center;
`;

const HoldingsTab = styled.div`
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;
`;

const PortfolioHeader = styled.div`
  background-color: #f0f8ff;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #036AD1;
`;

const PortfolioDetails = styled.div`
  background-color: #f0f8ff;
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
`;

const SummaryText = styled.div`
  font-size: 18px;
  color: #036AD1;
  margin: 5px 0;
`;

const StockAction = styled.div`
  background-color: #E0E0E0;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background-color: ${props => props.sell ? '#036AD1' : '#FF3B30'};
  color: #FFFFFF;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
`;

function PortfolioInvest() {
  const portfolio = useSelector(state => state.portfolio);

  // const totalInvested = portfolio.reduce((sum, stock) => sum + stock.invested, 0);
  // const totalCurrentValue = portfolio.reduce((sum, stock) => sum + stock.current, 0);
  // const totalReturn = portfolio.reduce((sum, stock) => sum + stock.return, 0);

  return (
    <FlexHorizontal>
      <FlexVertical style={{ width: '70%' }}>
        <PortfolioHeader>Your Portfolio</PortfolioHeader>
        <PortfolioDetails>
          <SummaryText>Current Value: ₹{}</SummaryText>
          <SummaryText>Invested Value: ₹{}</SummaryText>
          <SummaryText>Total Return: ₹{}</SummaryText>
          {/* <SummaryText>Current Value: ₹{totalCurrentValue}</SummaryText>
          <SummaryText>Invested Value: ₹{totalInvested}</SummaryText>
          <SummaryText>Total Return: ₹{totalReturn}</SummaryText> */}
        </PortfolioDetails>
        <Container>
          {/* {portfolio.map((stock, index) => (
            <HoldingsTab key={index}>
              <FlexHorizontal>
                <Text>{stock.name}</Text>
                <Text>₹{stock.invested}</Text>
                <Text>+ ₹{stock.return}</Text>
                <Text>₹{stock.current}</Text>
              </FlexHorizontal>
            </HoldingsTab>
          ))} */}
        </Container>
      </FlexVertical>

      <StockAction>
        <Text>Stocks</Text>
        <ActionButton>BUY</ActionButton>
        <ActionButton sell>SELL</ActionButton>
        <SummaryText>Shares: XYZ Share Name</SummaryText>
        <Text>Sticky Property</Text>
      </StockAction>
    </FlexHorizontal>
  );
}

export default PortfolioInvest;
