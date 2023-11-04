import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  /* width: 100%;
  height: 100%; */
  /* background-color: #1e1e1e; */
  color: #fff;
  font-family: "Inter";
  font-style: normal;
  font-weight: 1000;
  margin: 1.5rem 2rem;
`;

const Address = styled.p`
  color: #565656;
  font-family: "Inter";
  font-style: normal;
  font-weight: 1000;
  /* margin: 1.5rem 2rem; */
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: left;
`;

const Logo = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  object-fit: contain;
  margin-top: 1rem;
  margin-left: 2rem;
  /* border: 1px solid grey; */
  border-radius: 5px;
  background-color: #fff;
  padding: 0.5rem;
`;

const StockName = styled.p`
  font-size: 1.8rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  color: #fff;
  margin: 1rem 2rem;
`;

function GraphTop(props) {
  const stock = useSelector((state) => state.stock);

  const companyName = stock.get(props.symbol)[0].companyName;

  return (
    <Container>
      <Address>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          {" "}
          Home &gt;
        </Link>
        <Link to={"/stocks/"} style={{ textDecoration: "none" }}>
          {" "}
          stocks &gt;
        </Link>
        {companyName}
      </Address>
      <SubContainer>
        <Logo src={`/images/stockLogos/${props.symbol}.png`} />
        <StockName>{companyName}</StockName>
      </SubContainer>
    </Container>
  );
}

export default GraphTop;
