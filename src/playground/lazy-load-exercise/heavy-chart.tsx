function blockMainThread(ms: number) {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // intentionally block
  }
}

const bigData = Array.from({ length: 300000 }, (_, i) => ({
  id: i,
  value: Math.random() * 1000,
}));

export default function HeavyChart() {
  console.log("HeavyChart render started");

  blockMainThread(1200);

  const total = bigData.reduce((sum, item) => sum + item.value, 0);

  console.log("HeavyChart render finished");

  return (
    <section>
      <h2>Heavy Chart</h2>
      <p>Total: {total.toFixed(2)}</p>
      <p>Data points: {bigData.length}</p>
    </section>
  );
}
