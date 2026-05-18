import React, { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
};

const hugeDataset: Product[] = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Books", "Electronics", "Clothing", "Home"][i % 4],
  price: Math.round(Math.random() * 1000),
  rating: Math.round(Math.random() * 5),
}));

function expensiveFilter(product: Product, query: string) {
  // Artificial CPU work to make lag obvious
  let score = 0;

  for (let i = 0; i < 5000; i++) {
    score += Math.sqrt(i + product.price);
  }

  return (
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
}

function expensiveSort(a: Product, b: Product) {
  // Artificial CPU work during sort
  let aScore = 0;
  let bScore = 0;

  for (let i = 0; i < 1000; i++) {
    aScore += Math.sqrt(a.price + i);
    bScore += Math.sqrt(b.price + i);
  }

  return bScore - aScore;
}

function HugeTable({ rows }: { rows: Product[] }) {
  console.log("HugeTable rendered:", rows.length);

  return (
    <table border={1} cellPadding={8} style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Rating</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>${product.price}</td>
            <td>{product.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ProductPage() {
  const [query, setQuery] = useState("");
  // const deferredQuery = useDeferredValue(value);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  console.log("App rendered");

  const filtered = useMemo(() => {
    return hugeDataset
      .filter((item) => expensiveFilter(item, debouncedQuery))
      .sort(expensiveSort);
  }, [debouncedQuery]);

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Search Dashboard</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        style={{
          width: "100%",
          padding: 12,
          fontSize: 18,
          marginBottom: 16,
        }}
      />

      <p>
        Showing <strong>{filtered.length}</strong> results
      </p>

      <VirtualizedTable rows={filtered} />
    </main>
  );
}

function VirtualizedTable({ rows }: { rows: Product[] }) {
  const rowHeight = 42;
  const containerHeight = 500;
  const [scrollTop, setScrollTop] = React.useState(0);

  const startIndex = Math.floor(scrollTop / rowHeight);
  const visibleCount = Math.ceil(containerHeight / rowHeight) + 5;
  const endIndex = Math.min(startIndex + visibleCount, rows.length);

  const visibleRows = rows.slice(startIndex, endIndex);

  return (
    <div
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: rows.length * rowHeight, position: "relative" }}>
        <table
          style={{
            position: "absolute",
            top: startIndex * rowHeight,
            width: "100%",
          }}
        >
          <tbody>
            {visibleRows.map((product) => (
              <tr key={product.id} style={{ height: rowHeight }}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
