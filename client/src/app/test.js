const store = require("./store");
const getInitialStock = require("../features/stockSlice").getInitialStock;


store.dispatch(getInitialStock());

// store.getState()