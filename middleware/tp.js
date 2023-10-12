const updateStockInPortfolio = async (
    user,
    existingStock,
    type,
    quantity,
    price
  ) => {
    const userStock = await user.stocks.find((userStock) =>
      userStock.stock.equals(existingStock._id)
    );
  
    if (type === "BUY") {
      if (!userStock) {
        user.stocks.push({ stock: existingStock._id, quantity, buyPrice: price });
      } else {
        const totalInvestment =
          userStock.buyPrice * userStock.quantity + price * quantity;
        userStock.quantity += Number(quantity);
        userStock.buyPrice = totalInvestment / userStock.quantity;
      }
    } else {
      userStock.quantity -= Number(quantity);
      if (userStock.quantity === 0) {
        user.stocks = user.stocks.filter(
          (userStock) => !userStock.stock.equals(existingStock._id)
        );
        
      } else {
        // Fetch and sort transactions
        let transaction = await Transaction.find({
          stock: existingStock._id,
          user: user._id,
          type: "BUY",
        }).sort({ createdAt: -1 });
  
        // Calculate the sumSelledPrice and update quantities
        let totalBuyQuantity = 0;
        let i = 0;
        let sumSelledPrice = 0;
  
        while (totalBuyQuantity < quantity && i < transaction.length) {
          totalBuyQuantity++;
          sumSelledPrice += transaction[i].price;
  
          const updatedTransaction = await Transaction.findByIdAndUpdate(
            transaction[i]._id,
            { $inc: { quantity: -1 } },
            { new: true }
          );
  
          if (updatedTransaction.quantity === 0) {
            // Remove transactions with quantity equal to zero
            transaction = transaction.filter(
              (t) => !t._id.equals(updatedTransaction._id)
            );
          } else {
            i++;
          }
        }
  
        // Remove transactions with quantity equal to zero from the database
        const transactionIdsToRemove = transaction
          .filter((t) => t.quantity === 0)
          .map((t) => t._id);
  
        if (transactionIdsToRemove.length > 0) {
          await Transaction.deleteMany({ _id: { $in: transactionIdsToRemove } });
        }
  
        // Filter out transactions with quantity greater than zero
        transaction = transaction.filter((t) => t.quantity > 0);
  
        // Calculate the avg buy price
        userStock.buyPrice =
          (userStock.buyPrice * userStock.quantity - sumSelledPrice) /
          userStock.quantity;
  
        // Update the transactions
        for (const trans of transaction) {
          await trans.save({ suppressWarning: true });
        }
  
        // Update the stock
        await userStock.save();
      }
    }
  };