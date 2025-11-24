const NotFound = () => {
  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 1rem",
      }}
    >
      <img src="/Ola_tired.png" alt="Not Found" className="w-[12rem] mx-auto" />
      <p className="gap-[0.5rem] jalnan text-[10rem] text-primary-main1">404</p>
      <p className="text-[2.5rem] font-bold text-primary-main1">not found</p>
    </div>
  );
};

export default NotFound;
