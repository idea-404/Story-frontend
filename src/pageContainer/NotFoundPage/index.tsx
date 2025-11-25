import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col justify-center px-4 text-center">
      <img
        src="/Ola_tired.png"
        alt="Not Found"
        className="w-[10rem] mx-auto"
        onClick={() => navigate("/")}
      />
      <p className="jalnan text-[8rem] text-primary-main1">404</p>
      <p className="text-[1.5rem] font-bold text-primary-main1">not found</p>
    </div>
  );
};

export default NotFound;
