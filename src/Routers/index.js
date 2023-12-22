import { Route, Routes, BrowserRouter } from "react-router-dom";

import AdminLogin from "../Screens/Auth/Login";

import Error from "../Screens/Error";
import { Home } from "../Screens/Home";
import { ProductListing } from "../Screens/ProductListing";
import { Novel } from "../Screens/Novel";
import { ProductDetail } from "../Screens/ProductListing/productDetail";
import { MyAccount } from "../Screens/MyAccount";
import { ProtectedRoutes } from "./ProtectedRoutes";

export default function UserRouter() {
  return (
    <BrowserRouter basename="/TimUser">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/book-listing" element={<ProductListing />}></Route>
        <Route path="/novel-listing" element={<Novel />}></Route>
        <Route path="/book-listing/product-detail/:id" element={<ProductDetail />}></Route>
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<AdminLogin />}></Route>
        <Route path="/account" element={<ProtectedRoutes Components={MyAccount} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
