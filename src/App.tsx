import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components";
import NotFound from "./pageContainer/NotFoundPage";
import { Signin } from "@/Page";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      {!(pathname === "/404") && <Header />}
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
