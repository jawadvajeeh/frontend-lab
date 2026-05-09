import { Link } from "react-router";

function App() {
  return (
    <main className="min-h-screen w-full p-4">
      <div className="space-y-4">
        <h1 className="font-semibold text-fs-xl">Design System</h1>
        <Link to="/dashboard">Dashboard</Link>
        <div className="space-y-2">
          <div className="border-b">
            <h2 className="text-fs-lg font-semibold text-secondary-foreground">
              Typography
            </h2>
          </div>
          <div>
            <p className="text-fs-3xl">
              The quick brown fox jumps over the lazy dog (text-fs-3xl)
            </p>
            <p className="text-fs-2xl">
              The quick brown fox jumps over the lazy dog (text-fs-2xl)
            </p>
            <p className="text-fs-xl">
              The quick brown fox jumps over the lazy dog (text-fs-xl)
            </p>
          </div>
        </div>
        <div>
          <div className="border-b border-fill-muted/50">
            <h2 className="text-fs-lg font-semibold">Heading</h2>
          </div>
          <h3 className="font-semibold text-fs-xl">Heading 1</h3>
          <h3 className="font-semibold text-fs-lg">Heading 2</h3>
          <h3 className="font-semibold text-fs-md">Heading 3</h3>
          <h3 className="font-semibold text-fs-sm">Heading 4</h3>
        </div>
      </div>
    </main>
  );
}

export default App;
