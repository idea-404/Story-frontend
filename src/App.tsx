import { Routes, Route } from "react-router-dom";
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
