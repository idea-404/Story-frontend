import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components";
import SearchPage from "@/page/Search";
import MainPage from "@/page/MainPage";
import { Login, Writing } from "./page";
import NotFound from "./pageContainer/NotFoundPage";
import { Signin } from "@/page";
import { MyPage, UserPage, ProfileEditPage } from "@/page";
import { Signin, Commant } from "@/page";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/404" && <Header />}

      <Routes>
        <Route path="/commant" element={<Commant />} />
        <Route path="/blog/write" element={<Writing />} />
        <Route path="/portfolio/write" element={<Writing />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/info" element={<Signin />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/users/:userId" element={<UserPage />} />
        <Route path="/profile-edit" element={<ProfileEditPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
