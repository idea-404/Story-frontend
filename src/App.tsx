import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components";
import SearchPage from "@/page/Search";
import MainPage from "@/page/MainPage";
import NotFound from "./pageContainer/NotFoundPage";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/404" && <Header />}

      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
