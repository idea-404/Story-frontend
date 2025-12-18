import Printtitle from "./Printtitle";
import Printbody from "./Printbody";
const Print = ({ title, body }: { title: string; body: string }) => {
  return (
    <div className="mt-[4.25vh]">
      <Printtitle title={title} />
      <Printbody body={body} />
    </div>
  );
};

export default Print;
