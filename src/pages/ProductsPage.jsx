import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { apiRequest } from "../api";
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    size: "",
    minPrice: "",
    maxPrice: ""
  });

  const loadProducts = async () => {
    const query = new URLSearchParams(filters).toString();
    const data = await apiRequest("/api/products?" + query);
    setProducts(data.products || []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = async (product, size) => {
    const userId = localStorage.getItem("userId") || "guest-1";

    if (!size) {
      alert("Select size first");
      return;
    }

    await apiRequest("/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        userId,
        productId: product._id,
        size,
        quantity: 1
      })
    });

    alert("Added to cart");
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="products-page">

      {/* Filters */}
      <div className="filters">
        <input
          name="search"
          placeholder="Search products"
          value={filters.search}
          onChange={handleChange}
        />
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">Category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <select name="size" value={filters.size} onChange={handleChange}>
          <option value="">Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <input name="minPrice" placeholder="Min Price" onChange={handleChange} />
        <input name="maxPrice" placeholder="Max Price" onChange={handleChange} />

        <button onClick={loadProducts}>Apply</button>
      </div>

      {/* Grid */}
      <div className="grid">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

    </div>
  );
}

export default ProductsPage;
