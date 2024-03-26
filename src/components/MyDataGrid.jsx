import styled from "styled-components";
import productsData from "../data/sample_products_corrected.json";
import { useState } from "react";

const Container = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const MyDataGrid = () => {
  const [filter, setFilter] = useState("");
  const [visibleColumns, setVisibleColumns] = useState([
    "name",
    "category",
    "price",
  ]);

  const filteredProducts = filter
    ? productsData.filter((product) => product.category === filter)
    : productsData;

  const toggleColumnVisibility = (columnName) => {
    setVisibleColumns((prevColumns) =>
      prevColumns.includes(columnName)
        ? prevColumns.filter((col) => col !== columnName)
        : [...prevColumns, columnName]
    );
  };

  return (
    <Container>
      <FilterContainer>
        <label htmlFor="filter">Filter by Category:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          {Array.from(
            new Set(productsData.map((product) => product.category))
          ).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {["name", "category", "price"].map((columnName) => (
          <label key={columnName}>
            <input
              type="checkbox"
              checked={visibleColumns.includes(columnName)}
              onChange={() => toggleColumnVisibility(columnName)}
            />
            {columnName}
          </label>
        ))}
      </FilterContainer>
      <Table>
        <thead>
          <tr>
            {visibleColumns.includes("name") && <th>Name</th>}
            {visibleColumns.includes("category") && <th>Category</th>}
            {visibleColumns.includes("price") && <th>Price</th>}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              {visibleColumns.includes("name") && <td>{product.name}</td>}
              {visibleColumns.includes("category") && (
                <td>{product.category}</td>
              )}
              {visibleColumns.includes("price") && (
                <td>${product.price.toFixed(2)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyDataGrid;
