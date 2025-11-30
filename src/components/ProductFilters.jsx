import "./ProductFilters.css";

function ProductFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="filters-box">
      <input
        name="search"
        placeholder="Search by name or description"
        value={filters.search}
        onChange={handleChange}
        className="filters-input filters-search"
      />

      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="filters-select"
      >
        <option value="">All Categories</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
      </select>

      <select
        name="size"
        value={filters.size}
        onChange={handleChange}
        className="filters-select"
      >
        <option value="">All Sizes</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      <input
        name="minPrice"
        type="number"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleChange}
        className="filters-price"
      />

      <input
        name="maxPrice"
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleChange}
        className="filters-price"
      />
    </div>
  );
}

export default ProductFilters;
