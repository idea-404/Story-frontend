const Printtitle = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 className="text-[#3C3C3E] text-[1.875rem] font-medium leading-normal pb-[0.87rem]">
        {title}
      </h1>
      <hr className="h-[0.125rem] bg-[#CBCCCE] w-[35.75rem]" />
    </div>
  );
};

export default Printtitle;
