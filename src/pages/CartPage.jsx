import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import "./CartPage.css";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId") || "guest-1";
    const data = await apiRequest(`/api/cart?userId=${userId}`);
    setCart(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (itemId, quantity) => {
    await apiRequest("/api/cart/update", {
      method: "PUT",
      body: JSON.stringify({
        cartId: cart._id,
        itemId,
        quantity
      })
    });
    fetchCart();
  };

  const removeItem = async (itemId) => {
    await apiRequest("/api/cart/remove", {
      method: "DELETE",
      body: JSON.stringify({
        cartId: cart._id,
        itemId
      })
    });
    fetchCart();
  };

  if (loading) return <div className="cart-loading">Loading cart...</div>;
  if (!cart || cart.items.length === 0)
    return <div className="cart-empty">Your cart is empty</div>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="cart-wrapper">
      <h2 className="cart-title">Your Cart</h2>

      {cart.items.map((item) => (
        <div className="cart-item" key={item._id}>
          <div className="cart-left">
            <div className="cart-name">{item.productId.name}</div>
            <div className="cart-size">Size: {item.size}</div>
            <div className="cart-price">₹{item.productId.price}</div>
          </div>

          <div className="cart-right">
            <input
              type="number"
              min="1"
              className="cart-qty"
              value={item.quantity}
              onChange={(e) =>
                updateQty(item._id, Number(e.target.value))
              }
            />
            <button
              className="cart-remove"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-total-box">
        <div className="cart-total-label">Total:</div>
        <div className="cart-total-amount">₹{total}</div>
      </div>
    </div>
  );
}

export default CartPage;
