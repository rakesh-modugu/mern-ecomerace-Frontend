import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const data = await apiRequest("/api/cart");
      setCart(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (itemId) => {
    if (!cart) return;
    try {
      await apiRequest("/api/cart/remove", {
        method: "DELETE",
        body: JSON.stringify({ cartId: cart._id, itemId })
      });
      fetchCart();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleCheckout = async () => {
    try {
      await apiRequest("/api/orders/checkout", { method: "POST" });
      alert("Order Placed Successfully!");
      navigate("/orders");
    } catch (e) {
      alert("Checkout failed");
    }
  };

  if (loading) return <div className="container"><p>Loading cart...</p></div>;
  if (!cart || cart.items.length === 0) return <div className="container empty-cart"><h2>Your cart is empty</h2></div>;

  const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div className="cart-item-row" key={item._id}>
              <div className="item-details">
                <h4>{item.productId ? item.productId.name : "Unknown Product"}</h4>
                <p>Size: {item.size}</p>
              </div>
              <div className="item-price">₹{item.price}</div>
              <div className="item-qty">x {item.quantity}</div>
              <div className="item-action">
                <button onClick={() => removeItem(item._id)} className="remove-btn">Remove</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Total</span>
            <span className="total-price">₹{total}</span>
          </div>
          <button className="btn checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;