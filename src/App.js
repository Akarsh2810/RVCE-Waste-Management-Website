import { BrowserRouter, Route } from "react-router-dom";
import Routes from "../src/Routes";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Routes} />
    </BrowserRouter>
  );
}

export default App;
