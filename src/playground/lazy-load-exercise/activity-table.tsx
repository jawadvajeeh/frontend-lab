function blockMainThread(ms: number) {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // intentionally block
  }
}

const rows = Array.from({ length: 50000 }, (_, i) => ({
  id: i + 1,
  user: `User ${i + 1}`,
  action: "Opened dashboard",
}));

export default function ActivityTable() {
  console.log("ActivityTable render started");

  blockMainThread(800);

  console.log("ActivityTable render finished");

  return (
    <section>
      <h2>Recent Activity</h2>
      <ul>
        {rows.slice(0, 100).map((row) => (
          <li key={row.id}>
            {row.user} - {row.action}
          </li>
        ))}
      </ul>
    </section>
  );
}
