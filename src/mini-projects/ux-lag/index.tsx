import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

type TransformedProduct = Product & {
  computed: number;
};

const items: Product[] = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: `Product ${i}`,
  price: Math.random() * 100,
}));

function expensiveTransform(product: Product): TransformedProduct {
  let total = 0;

  for (let i = 0; i < 10000; i++) {
    total += Math.sqrt(product.price * i);
  }

  return {
    ...product,
    computed: total,
  };
}

function yieldToBrowser() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });
}

export default function ProductPage() {
  const [products, setProducts] = useState<TransformedProduct[]>([]);
  const [status, setStatus] = useState("Idle");

  async function handleLoadProducts() {
    setStatus("Loading...");
    // Let React commit + browser paint "Loading..." first
    await afterNextPaint();

    const transformed: TransformedProduct[] = [];
    const chunkSize = 100;

    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);

      for (const item of chunk) {
        transformed.push(expensiveTransform(item));
      }

      setStatus(
        `Processing ${Math.min(i + chunkSize, items.length)} / ${items.length}`,
      );
      await afterNextPaint();

      // Yield to browser so it can paint and handle input
      await yieldToBrowser();
    }

    setProducts(transformed);
    setStatus("Done");
  }

  return (
    <div>
      <button onClick={handleLoadProducts}>Load Products!</button>

      <p>{status}</p>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function afterNextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}
