import React, { Suspense } from "react";
import "./App.css";

const App1 = React.lazy(() => import("app1/App"));
const App2 = React.lazy(() => import("app2/App"));

function App() {
  return (
    <div className="App">
      HOST
      <React.Suspense fallback="Loading...">
        <App1 />
        <App2 />
      </React.Suspense>
    </div>
  );
}

export default App;
