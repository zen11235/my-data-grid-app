import React, { useState } from "react";
import styled, { css } from "styled-components";
import productsData from "../data/sample_products_corrected.json";

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
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`;

const SortIcon = styled.span`
  margin-left: 5px;
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  ${({ direction }) =>
    direction === "asc"
      ? css`
          border-bottom: 5px solid black;
        `
      : css`
          border-top: 5px solid black;
        `}
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const ActiveColumn = styled.th`
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #d4d4d4;
    `}
  cursor: pointer;
`;

const MyDataGrid = () => {
  const [filter, setFilter] = useState("");
  const [visibleColumns, setVisibleColumns] = useState([
    "name",
    "category",
    "price",
  ]);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const sortProducts = (a, b) => {
    if (!sortBy) return 0;
    if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  };

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(columnName);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedProducts = productsData
    .filter((product) => !filter || product.category === filter)
    .sort(sortProducts);

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
              onChange={() =>
                setVisibleColumns((current) =>
                  current.includes(columnName)
                    ? current.filter((col) => col !== columnName)
                    : [...current, columnName]
                )
              }
            />
            {columnName}
          </label>
        ))}
      </FilterContainer>
      <Table>
        <thead>
          <tr>
            {visibleColumns.map((columnName) => (
              <ActiveColumn
                key={columnName}
                onClick={() => handleSort(columnName)}
                isActive={sortBy === columnName}
              >
                {columnName.charAt(0).toUpperCase() + columnName.slice(1)}
                {sortBy === columnName && (
                  <SortIcon direction={sortDirection} />
                )}
              </ActiveColumn>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProducts.map((product) => (
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
