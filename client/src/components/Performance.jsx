import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.h1`
  color: #ffffff;
  font-family: "Inter";
  font-style: normal;
  font-weight: 1000;
  margin: 1.5rem 2rem;
  font-size: 2.5rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 1rem;
  margin-bottom: 8rem;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  color: #fff;
`;

const Range = styled.input`
    -webkit-appearance: none;
    width: 100%;
    height: 0.5rem;
    border-radius: 5px;
    background: #fff;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: #4CAF50;
        cursor: pointer;
    }
`;


function Performance() {
  return (
    <Container>
      <Title>Performance</Title>
      <MainContainer>
        <SubContainer>
          Today’s Low <br /> 855.85
        </SubContainer>
        <Range type="range"  />
        <SubContainer>
          Today’s High <br /> 906.00
        </SubContainer>
      </MainContainer>
    </Container>
  );
}

export default Performance;
