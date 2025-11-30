import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import "./OrdersPage.css";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const data = await apiRequest(`/api/orders?userId=${userId}`);
      setOrders(data.orders || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="orders-loading">Loading orders...</div>;

  if (orders.length === 0)
    return <div className="orders-empty">No orders found</div>;

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>

      {orders.map((order) => (
        <div className="order-box" key={order._id}>
          <div className="order-header">
            <div>Order ID: {order._id}</div>
            <div>Total: ₹{order.totalAmount}</div>
            <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
          </div>

          <div className="order-items">
            {order.items.map((item, index) => (
              <div className="order-item" key={index}>
                <div>{item.productId?.name}</div>
                <div>Size: {item.size}</div>
                <div>Qty: {item.quantity}</div>
                <div>₹{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;
