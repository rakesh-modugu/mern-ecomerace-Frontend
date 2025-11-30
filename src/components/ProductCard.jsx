import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  const handleAdd = () => {
    onAddToCart(product._id);
  };

  return (
    <div className="product-card">
      <div className="product-img-box">
        <img src={product.image || "https://placehold.co/300x300"} alt={product.name} />
      </div>
      <div className="product-info">
        <span className="product-cat">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
        <button className="btn add-cart-btn" onClick={handleAdd}>
          View Details / Add
        </button>
      </div>
    </div>
  );
}

export default ProductCard;