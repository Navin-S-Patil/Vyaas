import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGetPortfolioQuery } from "../features/apiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import LoadingScreen from "./LoadingScreen";

import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  margin-top: 20px;
  padding: 20px;
`;

const FlexHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #036ad1;
  text-align: center;
  align-items: center;
`;

const StockAction = styled.div`
  background-color: #e0e0e0;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.sell ? "#036AD1" : "#FF3B30")};
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
`;

function PortfolioInvest() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isError, isLoading, refetch } = useGetPortfolioQuery();
  const stockMap = useSelector((state) => state.stock.stocks);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    toast.error("Error fetching portfolio data");
    navigate("/");
    return null;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "stockName", label: "Stock", minWidth: 170 },
    { id: "quantity", label: "Quantity", minWidth: 100 },
    { id: "profit", label: "Profit", minWidth: 100 },
    { id: "averagePrice", label: "Average Price", minWidth: 100 },
    { id: "currentPrice", label: "Current Price", minWidth: 100 },
  ];

  const rows = data.stocks.map((portfolioStock) => {
    const stockDetails = stockMap.get(portfolioStock.name)?.[0];
    const currentPrice = stockDetails.historicalData[0].price;

    return {
      stockName: stockDetails?.companyName || portfolioStock.stock,
      quantity: portfolioStock.quantity,
      profit: ((currentPrice * portfolioStock.quantity - portfolioStock.averagePrice * portfolioStock.quantity).toFixed(2)),
      averagePrice: portfolioStock.averagePrice.toFixed(2),
      currentPrice: (currentPrice * portfolioStock.quantity).toFixed(2),
    };
  });

  return (
    <FlexHorizontal>
      <Paper sx={{ width: '80%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <StockAction>
        <Text>Stocks</Text>
        <ActionButton>BUY</ActionButton>
        <ActionButton sell>SELL</ActionButton>
        <Text>Sticky Property</Text>
      </StockAction>
    </FlexHorizontal>
  );
}

export default PortfolioInvest;
