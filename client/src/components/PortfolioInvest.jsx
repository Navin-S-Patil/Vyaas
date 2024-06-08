import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGetPortfolioQuery } from "../features/apiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import LoadingScreen from "./LoadingScreen";
import BuySellButton from "./BuySellButton";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const FlexHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4rem;
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
  height: 80%;
`;

const ActionButton = styled.button`
  background-color: ${(props) =>
    props.type === "sell" ? "#036AD1" : "#FF3B30"};
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;

const ProfitCell = styled.span`
  color: ${(props) => (props.profit > 0 ? "#036AD1" : "#F94364")};
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  color: #000;
  align-items: center;
  text-align: center;
`;

// Styled component for the table row
const StyledTableRow = styled(TableRow)`
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

function PortfolioInvest() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);

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

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleDoubleClick = (symbol) => {
    navigate(`/stocks/${symbol}`);
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
    const profitValue = (
      currentPrice * portfolioStock.quantity -
      portfolioStock.averagePrice * portfolioStock.quantity
    ).toFixed(2);

    return {
      stockName: stockDetails?.companyName || portfolioStock.stock,
      quantity: portfolioStock.quantity,
      profit: profitValue,
      averagePrice: portfolioStock.averagePrice.toFixed(2),
      currentPrice: (currentPrice * portfolioStock.quantity).toFixed(2),
      symbol: portfolioStock.name,
    };
  });

  const formatProfit = (profit) => {
    const profitValue = parseFloat(profit);
    return (
      <ProfitCell profit={profitValue}>
        {profitValue > 0 ? `+${profit}` : `-${Math.abs(profit)}`}
      </ProfitCell>
    );
  };

  return (
    <>
      <Heading>Your Portfolio</Heading>
      <FlexHorizontal style={{ justifyContent: "space-around" }}>
        <Paper sx={{ width: "80%", overflow: "hidden" }}>
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
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      onClick={() => handleRowClick(row)}
                      onDoubleClick={() => handleDoubleClick(row.symbol)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onDoubleClick={
                              column.id === "stockName"
                                ? () => handleDoubleClick(row.symbol)
                                : null
                            }
                          >
                            {column.id === "profit"
                              ? formatProfit(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </StyledTableRow>
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
          {selectedRow ? (
            <BuySellButton
              symbol={selectedRow.symbol}
              price={selectedRow.currentPrice}
            />
          ) : (
            <BuySellButton />
          )}
          {selectedRow && (
            <>
              <Text>Selected Stock: {selectedRow.stockName}</Text>
              <Text>Quantity: {selectedRow.quantity}</Text>
              <Text>Profit: {formatProfit(selectedRow.profit)}</Text>
            </>
          )}
        </StockAction>
      </FlexHorizontal>
    </>
  );
}

export default PortfolioInvest;
