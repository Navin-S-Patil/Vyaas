import React from 'react'
import styled from 'styled-components'
import logo from "../images/logo.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* width: 100%; */
    color: #000;    
    /* background-color: #fff; */
    border-radius: 10px;
    padding: 1em;
    margin: 1em;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    &:hover {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }
`;

const Logo = styled.img`
    width: 100%;
    height: 100%;
    max-width: 300px;
    /* max-height: 100px; */
    margin-bottom: 1em;
`;

const Text = styled.h2`
    font-size: 2.8rem;
    font-weight: 600;   
    color: #ffffff;
    margin: 1rem;
    margin-bottom: 2rem;
`;


function StocksSearch() {
  return (
    <Container>
        <Logo src={logo} alt="logo"/>
        <Text>For more specific Stocks use the Search</Text>
    </Container>
  )
}

export default StocksSearch