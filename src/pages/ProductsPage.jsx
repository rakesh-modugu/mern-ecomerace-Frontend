import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import ProductCard from "../components/ProductCard";
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", search: "" });

  const fetchProducts = async () => {
    try {
      let query = `/api/products?`;
      if (filters.category) query += `category=${filters.category}&`;
      if (filters.search) query += `search=${filters.search}`;
      
      const data = await apiRequest(query);
      setProducts(data.products || []);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }
    const size = prompt("Enter Size (S, M, L, XL):");
    if (!size) return;

    try {
      await apiRequest("/api/cart/add", {
        method: "POST",
        body: JSON.stringify({ productId, quantity: 1, size: size.toUpperCase() })
      });
      alert("Added to cart!");
    } catch (e) {
      alert(e.message);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container products-page">
      <div className="filters-bar">
        <input 
          name="search" 
          placeholder="Search products..." 
          onChange={handleFilterChange} 
        />
        <select name="category" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;