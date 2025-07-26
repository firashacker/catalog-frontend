import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./routes/NavigationBar";
import Home from "./routes/Home";
import Products from "./routes/Products";
import Categories from "./routes/Categories";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Cart from "./routes/Cart";

import ProductUpload from "./routes/Products.upload";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <div
          className="p-12 min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex "
          dir="rtl"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/upload" element={<ProductUpload />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
