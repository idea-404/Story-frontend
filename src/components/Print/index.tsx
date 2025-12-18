import Printtitle from "./Printtitle";
import Printbody from "./Printbody";
const Print = ({
  title = "제목을 입력해 주세요.",
  body = "내용을 입력해 주세요.",
}: {
  title?: string;
  body?: string;
}) => {
  return (
    <div className="mt-[4.25vh]">
      <Printtitle title={title} />
      <Printbody body={body} />
    </div>
  );
};

export default Print;
