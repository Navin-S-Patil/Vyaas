import React from 'react'
import styled from 'styled-components'
import IndividualStockBox from './IndividualStockBox';


const Container = styled.div`
    display:grid;
    grid-gap:2em;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
`;

const Box = styled.div`
    /* grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); */
    /* width: 100%; */
`;



function StockBoxGrid() {
  return (
    <Container>
        <Box><IndividualStockBox/></Box>
        <Box><IndividualStockBox/></Box>
        <Box><IndividualStockBox/></Box>
        <Box><IndividualStockBox/></Box>
        <Box><IndividualStockBox/></Box>
        <Box><IndividualStockBox/></Box>
        <Box><IndividualStockBox/></Box>
        <Box><IndividualStockBox/></Box>
        <Box><IndividualStockBox/></Box>
        <Box><IndividualStockBox/></Box>
    </Container>
  )
}

export default StockBoxGrid