import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import "./OrdersPage.css";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiRequest("/api/orders");
        setOrders(data.orders || []);
      } catch (e) {
        console.error("Failed to load orders", e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="container"><p>Loading your orders...</p></div>;

  if (orders.length === 0) {
    return (
      <div className="container empty-orders">
        <h2>No orders yet</h2>
        <p>Go shopping and grab some clothes!</p>
      </div>
    );
  }

  return (
    <div className="container orders-page">
      <h1>My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <span className="label">Order ID:</span> {order._id}
              </div>
              <div>
                <span className="label">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="order-total">
                Total: ₹{order.totalAmount}
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-row">
                  <span>{item.productId ? item.productId.name : "Unknown Item"}</span>
                  <span>Size: {item.size}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;