import Printtitle from "./Printtitle";
import Printbody from "./Printbody";
const Print = ({
  title,
  body,
  setEnd,
}: {
  title: string;
  body: string;
  setEnd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="mt-[4.25vh]">
      <Printtitle title={title} />
      <Printbody title={title} body={body} setEnd={setEnd} />
    </div>
  );
};

export default Print;
