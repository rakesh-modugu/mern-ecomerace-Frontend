import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./CheckoutPage.css";

function CheckoutPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setError("");
    setSuccess("");

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("Please login to place your order.");
      return;
    }

    try {
      await apiRequest("/api/orders/checkout", {
        method: "POST",
        body: JSON.stringify({ userId })
      });

      setSuccess("Order placed successfully.");
      setTimeout(() => navigate("/orders"), 2000);
    } catch (e) {
      setError(e.message || "Something went wrong");
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <p className="checkout-note">
        This is a mock checkout. No real payment will be processed.
      </p>

      {error && <p className="checkout-error">{error}</p>}
      {success && <p className="checkout-success">{success}</p>}

      <button className="checkout-button" onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  );
}

export default CheckoutPage;
