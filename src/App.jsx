import React from "react";
import ReactDOM from "react-dom";
import RoutesApp from "./routes/routes";

function App() {
  return (
    <React.StrictMode>
        <RoutesApp />
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
