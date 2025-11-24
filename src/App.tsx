import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components";
import NotFound from "./pageContainer/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
          </>
        }
      />

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
