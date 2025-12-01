import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components";
import { Search } from "./components";
import NotFound from "./pageContainer/NotFoundPage";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <Header EndPoint={isSignIn} />
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
      {!(pathname === "/404") && <Header />}
      <Routes>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
