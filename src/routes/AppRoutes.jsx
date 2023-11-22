import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/User/LoginPage";
import Callback from "../pages/User/CallbackPage";
import UserProfile from "../pages/User/UserProfilePage";
import NavigationBar from "../components/NavigationBar";
import ProtectedRoute from "../pages/User/ProtectedPage";
import ProductoPage from "../pages/Product/ProductPage";
import CategoriesPage from '../pages/Categories/CategoryPage';  

import { Container } from "react-bootstrap";
const AppRoutes = () => {
  return (
    <Router>
      <NavigationBar />

      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/productos" element={<ProtectedRoute />}>
            <Route index element={<ProductoPage />} />
          </Route>
          <Route path="/categorias" element={<ProtectedRoute />}>
            <Route index element={<CategoriesPage />} />
          </Route>
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route index element={<UserProfile />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
};

export default AppRoutes;
