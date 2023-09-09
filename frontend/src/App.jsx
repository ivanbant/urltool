import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
