import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Location from "./components/Location";
import Pricing from "./components/Pricing";
import NotFound from "./components/NotFound";
import FAQ from "./components/FAQ";
import SizeGuide from "./components/SizeGuide";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Main />} >
          <Route index element={<Home />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="location" element={<Location />} />
          <Route path="size" element={<SizeGuide />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
