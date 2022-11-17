import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Location from "./components/Location";
import Pricing from "./components/Pricing";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Main />} >
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="location" element={<Location />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
