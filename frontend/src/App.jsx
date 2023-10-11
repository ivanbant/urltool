import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import PricingScreen from "./screens/PricingScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import DashboardRoute from "./components/DashboardRoute";
import DashboardProfileScreen from "./screens/DashboardProfileScreen";
import DashboardSubscriptionScreen from "./screens/DashboardSubscriptionScreen";
import DashboardAnalyticsScreen from "./screens/DashboardAnalyticsScreen";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/pricing" element={<PricingScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardRoute />}>
            <Route
              path="/dashboard/profile"
              element={<DashboardProfileScreen />}
            />
            <Route
              path="/dashboard/subscription"
              element={<DashboardSubscriptionScreen />}
            />
            <Route
              path="/dashboard/analytics"
              element={<DashboardAnalyticsScreen />}
            />
          </Route>
          <Route path="/checkout" element={<CheckoutScreen />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
