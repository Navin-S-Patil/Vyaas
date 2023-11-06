import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  useBuyMutation,
  useGetUserBalanceMutation,
} from "../features/stockApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../features/authSlice";

const buttonStyle = {
  backgroundColor: "#036AD1",
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
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleDecrement = () => {
    setCounter((prevCounter) => prevCounter - 1);
  };

  const displayCounter = counter > 0;

  const { userInfo } = useSelector((state) => state.auth);
  const [buy] = useBuyMutation();
  const [getUserBalance] = useGetUserBalanceMutation();

  async function handleSubmit() {
    // BUY handler
    try {
      const res = await buy({
        username: userInfo.username,
        stock: props.symbol,
        quantity: counter,
        price: props.price,
      }).unwrap();
      console.log(res);

      //set Balance
      const balance = await getUserBalance({
        _id: userInfo._id,
      }).unwrap();
      console.log(balance);
      dispatch(setBalance(balance));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={handleIncrement} style={buttonStyle}>
          Buy
        </Button>
        {displayCounter && (
          <Button disabled style={middleButtonStyle}>
            {counter}
          </Button>
        )}
        {displayCounter && (
          <Button onClick={handleDecrement} style={buttonStyle}>
            Sell
          </Button>
        )}
      </ButtonGroup>

      {/* confirm  */}
      {displayCounter && (
        <Button style={buttonStyle} onClick={handleSubmit}>
          Confirm
        </Button>
      )}
    </>
  );
}

export default BuySellButton;
