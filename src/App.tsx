import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components";
import SearchPage from "@/page/Search";
import MainPage from "@/page/MainPage";
import { Login } from "./page";
import NotFound from "./pageContainer/NotFoundPage";
import { Signin } from "@/page";
import ResendMail from "./components/Modal/ResendMail";
import Delete from "./components/Modal/Delete";
import AIFeedback from "./components/Modal/AIFeedback";
import SelectWrite from "./components/Modal/SelectWrite";
import Portfolio from "./components/Modal/Portfolio";
import Blog from "./components/Modal/blog";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/404" && <Header />}

      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/info" element={<Signin />} />
        <Route path="/modal" element={<ResendMail />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/feedback" element={<AIFeedback />} />
        <Route path="/selectwrite" element={<SelectWrite />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
