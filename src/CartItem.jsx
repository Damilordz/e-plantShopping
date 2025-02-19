import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";
import PropTypes from "prop-types";

const CartItem = ({ onContinueShopping, onRemoveItem }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce(
      (total, item) =>
        total + parseFloat(item.cost.replace("$", "")) * item.quantity,
      0
    );
  };

  const handleContinueShopping = (e) => {
    // e.preventDefault();
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    onRemoveItem(item); 
  };

  const handleCheckout = () => {
    setShowMessage(true); // Show the "Coming Soon" message when the button is clicked
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.replace("$", "")) * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckout}>
          Checkout
        </button>{" "}
        {showMessage && (
          <p style={{ color: "green", marginTop: "10px", fontWeight: "bold" }}>
            Coming Soon!
          </p>
        )}
      </div>
    </div>
  );
};
CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};

export default CartItem;
