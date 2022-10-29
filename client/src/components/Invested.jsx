import React from "react";
import styled from "styled-components";

const Container = styled.div`
  color: none;
  background-color: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 5rem;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  color: #000;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between;
  align-items: center; */
  padding: 1rem;
  /* margin: 1rem; */
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 16px 4px rgba(180, 180, 180, 0.86);
  border-radius: 15px;
`;

const BoxText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Text = styled.p`
  font-size: 1.5rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  color: #000;
  padding: 0rem 2rem;
`;

function Invested() {
  return (
    <Container>
      <Heading>You have Invested</Heading>
      <Box>
        <BoxText>
            <Text>+₹80</Text>
            <Text>+₹80</Text>
        </BoxText>
        <BoxText>
            <Text>Total Returns</Text>
            <Text>Current Value</Text>
        </BoxText>
      </Box>
    </Container>
  );
}

export default Invested;
