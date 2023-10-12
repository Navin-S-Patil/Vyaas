const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Simple email format validation using regular expression
        return /\S+@\S+\.\S+/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  password: { type: String, required: true },
  balance: { type: Number, default: 100000 }, // Initial virtual balance for paper trading
  portfolio: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio', required: true },
});

module.exports = mongoose.model("User", UserSchema);
