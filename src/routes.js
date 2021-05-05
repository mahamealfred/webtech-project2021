import { Navigate } from "react-router-dom";
import DashboardLayout from "src/components/DashboardLayout";
import MainLayout from "src/components/MainLayout";
import Account from "src/pages/Account";
import CategoryList from "src/pages/CategoryList";
import Dashboard from "src/pages/Dashboard";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";
import ProductList from "src/pages/ProductList";
import OrdersList from "src/pages/OrderList";
import Register from "src/pages/Register";
import Settings from "src/pages/Settings";
import HomeScreen from "src/screens/HomeScreen";
import ProductScreen from "src/screens/ProductScreen";
import CartScreen from "src/screens/CartScreen";
import Navbar from "./components/Home/Navbar";
import UserLayout from "./components/UserLayout";
import Mahame from "src/pages/Mahame.js";


const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "account", element: <Account /> },
      { path: "category", element: <CategoryList /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <ProductList /> },
      { path: "orders", element: <OrdersList /> },
     
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomeScreen /> },
      { path: "/login", element: <Login /> },
      { path: "/home", element: <HomeScreen /> },
      { path: "/product", element: <ProductScreen /> },
      { path: "/cart", element: <CartScreen /> },
      { path: "register", element: <Register /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
 
];

export default routes;
