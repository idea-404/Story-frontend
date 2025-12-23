import { Portfolio, Blog } from "@/assets";

export default function SelectWrite({
  setwritemode,
}: {
  setwritemode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[280px] rounded-xl bg-white px-6 py-5 text-center">
        <p className="mb-5 text-sm font-medium text-gray-800">
          무슨 글을 작성하실 건가요?
        </p>
        <div className="flex gap-3">
          <button className="flex flex-1 flex-col items-center gap-2 rounded-lg bg-gray-100 py-4 text-sm font-medium text-gray-700 hover:bg-gray-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-main1 text-purple-400">
              <Portfolio className="w-7 h-7" />
            </div>
            포트폴리오
          </button>
          <button className="flex flex-1 flex-col items-center gap-2 rounded-lg bg-gray-100 py-4 text-sm font-medium text-gray-700 hover:bg-gray-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-main1 text-purple-400">
              <Blog className="w-5 h-5" />
            </div>
            블로그
          </button>
        </div>
      </div>
    </div>
  );
}
