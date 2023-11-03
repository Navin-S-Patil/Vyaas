const store = require("./store");
const getInitialStock = require("../features/stockSlice").getInitialStock;


// console.log("Initial State: ", store.getState());
// const unsubscribe = store.subscribe(() =>
//   console.log("Updated State: ", store.getState())
// );

store.dispatch(getInitialStock());

// store.getState()