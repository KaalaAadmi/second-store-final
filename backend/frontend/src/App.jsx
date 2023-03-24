import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import Otp from "./pages/Otp";
import { useSelector } from "react-redux";
import ScrollToTop from "./scrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SetPassword from "./pages/SetPassword";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/products/:category" element={<ProductList />} exact />
        <Route path="/products" element={<ProductList />} exact />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<CheckoutSuccess />} />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate replace to="/" /> : <Register />}
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/setPassword" element={<SetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
