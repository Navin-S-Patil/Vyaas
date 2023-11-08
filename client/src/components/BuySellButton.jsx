import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  useBuyMutation,
  useSellMutation,
  useGetUserBalanceMutation,
} from "../features/stockApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../features/authSlice";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";

const buttonStyle = {
  backgroundColor: "#036AD1",
  color: "white",
  borderRadius: "0.5rem",
  padding: "0.6rem 2rem",
  fontSize: "1rem",
  fontWeight: "bolder",
  margin: "0 0.5rem",
};

const sellButtonStyle = {
  backgroundColor: "#F94364",
  color: "white",
  borderRadius: "0.5rem",
  padding: "0.6rem 2rem",
  fontSize: "1rem",
  fontWeight: "bolder",
  margin: "0 0.5rem",
};

const middleButtonStyle = {
  backgroundColor: "#fff",
  color: "#036AD1",
  borderRadius: "0.5rem",
  padding: "0.6rem 2rem",
  fontSize: "1rem",
  fontWeight: "bolder",
  margin: "0 0.5rem",
};

function BuySellButton(props) {
  // const [buysellState, setBuysellState] = useState({
  //   buy: false,
  //   sell: false,
  // });

  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);

  const [buySellState, setBuySellState] = useState();

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleDecrement = () => {
    setCounter((prevCounter) => {
      if (prevCounter > 0) {
        return prevCounter - 1;
      } else {
        return 0;
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setCounter(0);
  };

  const { userInfo } = useSelector((state) => state.auth);
  const [buy] = useBuyMutation();
  const [sell] = useSellMutation();
  const [getUserBalance] = useGetUserBalanceMutation();

  async function handleSubmit() {
    //checks
    if (counter === 0) {
      toast.error("Please select a quantity");
      return;
    }

    // BUY handler
    try {
      if (buySellState === "Buy") {
        await buy({
          username: userInfo.username,
          stock: props.symbol,
          quantity: counter,
          price: props.price,
        }).unwrap();
      } else {
        await sell({
          username: userInfo.username,
          stock: props.symbol,
          quantity: counter,
          price: props.price,
        }).unwrap();
      }

      //set Balance
      const balance = await getUserBalance({
        _id: userInfo._id,
      }).unwrap();
      // console.log(balance);
      dispatch(setBalance(balance));
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error.data.error);
    }
  }

  return (
    <>
      <ButtonGroup size="small" aria-label="small  button group">
        <Button
          onClick={() => {
            setOpen(true);
            setBuySellState("Buy");
          }}
          style={buttonStyle}
        >
          Buy
        </Button>

        <Button
          onClick={() => {
            setOpen(true);
            setBuySellState("Sell");
          }}
          style={sellButtonStyle}
        >
          Sell
        </Button>
      </ButtonGroup>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{
            color: buySellState === "Buy" ? "#036AD1" : "#F94364",
            fontWeight: 800,
            fontSize: "1.5rem",
            background:
              "linear-gradient(112deg, rgba(165, 251, 233, 0.95) 0.32%, rgba(157, 212, 238, 0.95) 27.87%, rgba(102, 115, 250, 0.68) 113.85%);",
            mb: 2,
          }}
        >
          {buySellState}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            You can {buySellState} {props.symbol} stocks
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <Box sx={{ flexDirection: "row", mb: 2 }}>
                <Button onClick={handleIncrement} style={buttonStyle}>
                  +
                </Button>
                <Button disabled style={middleButtonStyle}>
                  {counter}
                </Button>
                <Button onClick={handleDecrement} style={buttonStyle}>
                  -
                </Button>
              </Box>
              <Button style={buttonStyle} onClick={handleSubmit}>
                Confirm
              </Button>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default BuySellButton;
