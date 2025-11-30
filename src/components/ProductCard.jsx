import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />

      <div className="category">{product.category}</div>
      <h3 className="name">{product.name}</h3>
      <p className="desc">{product.description}</p>
      <div className="price">₹{product.price}</div>

      <select
        className="size-box"
        defaultValue=""
        onChange={(e) => onAddToCart(product, e.target.value)}
      >
        <option value="" disabled>Select size</option>
        {product.sizes.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <button
        className="add-btn"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
