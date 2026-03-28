function App() {
  return (
    <main className="min-h-screen w-full bg-layer-floor-0 p-sm font-montserrat">
      <div className="space-y-md">
        <h1 className="font-semibold text-heading-xl">Design System</h1>
        <div className="space-y-sm">
          <div className="border-b border-fill-muted/50">
            <h2 className="text-heading-lg font-semibold">Typography</h2>
          </div>
          <div>
            <p className="text-body-lg">
              The quick brown fox jumps over the lazy dog (text-body-lg)
            </p>
            <p className="text-body-md">
              The quick brown fox jumps over the lazy dog (text-body-md)
            </p>
            <p className="text-body-sm">
              The quick brown fox jumps over the lazy dog (text-body-sm)
            </p>
            <p className="text-body-xs">
              The quick brown fox jumps over the lazy dog (text-body-xs)
            </p>
          </div>
        </div>
        <div>
          <div className="border-b border-fill-muted/50">
            <h2 className="text-heading-lg font-semibold">Heading</h2>
          </div>
          <h3 className="font-semibold text-heading-xl">Heading 1</h3>
          <h3 className="font-semibold text-heading-lg">Heading 2</h3>
          <h3 className="font-semibold text-heading-md">Heading 3</h3>
          <h3 className="font-semibold text-heading-sm">Heading 4</h3>
        </div>
      </div>
    </main>
  );
}

export default App;
